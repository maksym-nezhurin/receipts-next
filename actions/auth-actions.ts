'use server';

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

    // return Promise.resolve(true);

    // store it in the db (create a new user)

    // redirect('/recipes')
}

export async function registerUserAction(prevState: any, formData: FormData) {
    const fields = {
        name: formData.get("name"),
        password: formData.get("password"),
        password_confirmation: formData.get("confirmation"),
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
        const { message, errors } = responseData;

        if (!responseData || errors) {
            return {
                ...prevState,
                apiErrors: null,
                zodErrors: errors,
                message: message || "Ops! Something went wrong. Please try again.",
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

        // const {
        //     data: user,
        //     access_token,
        //     token_type
        // } = responseData;
        // console.log('user', user);
        // authUser(`${token_type} ${access_token}`)

        return {
            message,
            data: 'ok',
        };
    } catch (error) {
        return {
            ...prevState,
            data: 'error',
            message: "Failed to Register User.",
        };
    }
}

export async function loginUserAction(prevState: any, formData: FormData) {
    console.log('loginUserAction')
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

    try {
        // signIn('credentials', {
        //     redirect: true, // Запобігає автоматичному перенаправленню
        //     ,
        // });

        return {
            status: 'ok',
            data: validatedFields.data,
        };
    } catch (error) {
        return {
            ...prevState,
            data: 'error',
            message: "Failed to Login User.",
        };
    }
}

const authUser = (value: string) => {
    const expires = new Date(Date.now() + 0.2 * 24 * 60 * 60 * 1000)
    cookies().set('authenticated', value, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}