'use client';

import Link from 'next/link';
import Image from "next/image";
import { useFormState } from "react-dom";
import './authForm.css'

import { signup } from "@/actions/auth-actions";

interface IFormState {
    email: string;
    password: string;
    errors: Record<string, string>;
}

const initialState = { email: "", password: "", errors: {} }

export default function AuthForm() {
  // @ts-ignore
    const [formState, formAction] = useFormState<IFormState>(signup, initialState);
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <Image src="/images/auth-icon.jpg" alt="A lock icon" width={100} height={100} />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>

        {formState.errors && <ul id="form-errors">{
            Object.keys(formState.errors).map((key) => (
                <li key={key}>{formState.errors[key]}</li>
            ))
        }</ul>}
      <p>
        <button type="submit">
          Create Account
        </button>
      </p>
      <p>
        <Link href="/public">Login with existing account.</Link>
      </p>
    </form>
  );
}
