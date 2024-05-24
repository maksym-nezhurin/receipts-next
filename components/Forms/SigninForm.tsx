"use client";

import Link from "next/link";

import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {loginUserAction} from "@/actions/auth-actions";
import {FormErrors} from "@/components/Forms/FormErrors";
import {SubmitButton} from "@/components/SubmitButton/SubmitButton";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";

interface IState {
    email: string;
    password: string;
    zodErrors: { [keyof: string]: string[]};
}

const initialState: IState = {
    email: '',
    password: '',
    zodErrors: {}
}
export function SigninForm() {
    const router = useRouter();
    const { data: session }= useSession();
    const [formState, setFormState] = useState(initialState);
    const [error, setError] = useState('');

    useEffect(() => {
        // @ts-ignore
        if (session?.user?.accessToken) {
            setError("");
            router.push("/");
        }
    }, [session, router])

    const onHandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await loginUserAction({data: 'error'}, new FormData(e.target as HTMLFormElement));

        if (result.status === 'ok') {
            await signIn('credentials', {
                ...formState,
                redirect: false, // Запобігає автоматичному перенаправленню
            });
        } else if (result.data === 'error') {
            setError('Invalid credentials, try again');
            setFormState({ ...formState, zodErrors: result.zodErrors });
        }

        // @ts-ignore
        if (!session?.user?.accessToken) {
            setError('Invalid credentials, try again');
            setFormState((state) => ({
                ...state,
                email: '',
                password: ''
            }));
        }
    }

    return (
        <div className="w-full max-w-md">
            <form onSubmit={onHandleSubmit}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
                        <CardDescription>
                            Enter your details to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Username or Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                placeholder="username or email"
                            />
                            <FormErrors errors={formState?.zodErrors?.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={(e) => setFormState({...formState, password: e.target.value})}
                                placeholder="password"
                            />
                            <FormErrors errors={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        {error && <p className="text-red-500 text-sm">Please, check your credentials!</p>}
                        <SubmitButton className="w-full" text="Sign In" loadingText="Loading" />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?
                    <Link className="underline ml-2" href='/signup'>
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}