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
import {useFormState} from "react-dom";
import {loginUserAction} from "@/actions/auth-actions";
import {FormErrors} from "@/components/forms/FormErrors";
import {SubmitButton} from "@/components/SubmitButton/SubmitButton";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export function SigninForm() {
    const router = useRouter();
    const [formState, formAction] = useFormState(loginUserAction, { data: null });
    console.log(formState);

    useEffect(()=> {
        if (formState.data === 'ok') {
            router.replace('/recipes');
        }
    }, [formState.data])
    // console.log(formState.message, 'check if user is logged in');
    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
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
                                placeholder="password"
                            />
                            <FormErrors errors={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton className="w-full" text="Sign In" loadingText="Loading" />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?
                    <Link className="underline ml-2" href="/signup">
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}