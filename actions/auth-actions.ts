'use server';

import {hashUserPassword} from "@/lib/hash";
import {redirect} from "next/navigation";

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
        console.log(email, password, hashedPassword);
        // store in the db
        return true;
    } catch (error) {
        return false;
    }
    // return Promise.resolve(true);

    // store it in the db (create a new user)

    redirect('/contact')
}