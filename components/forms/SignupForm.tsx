"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

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
import {registerUserAction} from "@/actions/auth-actions";
import {FormErrors} from "@/components/forms/FormErrors";
import {SubmitButton} from "@/components/SubmitButton/SubmitButton";

export function SignupForm() {
    const INITIAL_STATE = {
        data: null,
    };
    const [formState, formAction] = useFormState(registerUserAction, INITIAL_STATE);
    console.log(formState);
    return (
        <div className="w-full max-w-md">
            <form action={formAction}>
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your details to create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Username</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="name"
                            />
                            <FormErrors errors={formState?.zodErrors?.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmation">Password confirmation:</Label>
                            <Input
                                id="confirmation"
                                name="confirmation"
                                type="password"
                                placeholder="confirmation"
                            />
                            <FormErrors errors={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
                    </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm">
                    Have an account?
                    <Link className="underline ml-2" href="/signin">
                        Sing In
                    </Link>
                </div>
            </form>
        </div>
    );
}