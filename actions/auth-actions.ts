'use server';

import {hashUserPassword} from "@/lib/hash";
import {redirect} from "next/navigation";
import { cookies } from 'next/headers'

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