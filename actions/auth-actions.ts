'use server';

import {hashUserPassword} from "@/lib/hash";
import {redirect} from "next/navigation";
import { cookies } from 'next/headers'
import {schemaRegister} from "@/actions/schemas/register";
import {schemaLogin} from "@/actions/schemas/login";
import {registerUserService} from "@/services/auth-service";

const PASS_LENGTH = 8
// type SignupResult = boolean | { errors: Record<string, string>};
interface IErrors {
    email?: string,
    password?: string
}

export async function signup(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    let errors: Partial<IErrors> = {};

    if (!email.includes('@')) {
        errors.email = 'Invalid email';
    }

    if (password?.trim().length < PASS_LENGTH) {
        errors.password = `Password must be at least ${PASS_LENGTH} characters`;
    }

    if (Object.keys(errors).length) {
        return {
            errors,
        }
    }

    const hashedPassword = hashUserPassword(password);

    try {
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        cookies().set('authenticated', 'true', {
            httpOnly: true,
            secure: true,
            expires: expires,
            sameSite: 'lax',
            path: '/',
        })
        console.log(email, password, hashedPassword);
        // store in the db
        // return true;
    } catch (error) {
        return false;
    }
    // return Promise.resolve(true);

    // store it in the db (create a new user)

    redirect('/recipes')
}

export async function registerUserAction(prevState: any, formData: FormData) {
    const fields = {
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
    };

    const validatedFields = schemaRegister.safeParse(fields);

    if (!validatedFields.success) {
        return {
            ...prevState,
            data: 'error',
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Register.",
        };
    }

    // Register user with next fields

    try {
        const responseData = await registerUserService(validatedFields.data);

        if (!responseData) {
            return {
                ...prevState,
                apiErrors: null,
                zodErrors: null,
                message: "Ops! Something went wrong. Please try again.",
            };
        }

        if (responseData.error) {
            return {
                ...prevState,
                apiErrors: responseData.error,
                zodErrors: null,
                message: "Failed to Register.",
            };
        }
    } catch (error) {
        return {
            ...prevState,
            data: 'error',
            message: "Failed to Register User.",
        };
    }

    return {
        ...prevState,
        zodErrors: {},
        message: "User Registered Successfully",
        data: 'ok',
    };
}

export async function loginUserAction(prevState: any, formData: FormData) {
    const fields = {
        password: formData.get("password"),
        email: formData.get("email"),
    };

    const validatedFields = schemaLogin.safeParse(fields);

    if (!validatedFields.success) {
        return {
            ...prevState,
            data: 'error',
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Login.",
        };
    }

    return {
        ...prevState,
        zodErrors: {},
        message: "User Login Successfully",
        data: 'ok',
    };
}