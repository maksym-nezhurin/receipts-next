"use client";

import { useRouter } from 'next/navigation'
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
import { verifyCodeAction} from "@/actions/auth-actions";
import {Button} from "@/components/ui/button";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {useEffect} from "react";

2

export function VerifyForm(props) {
    const router = useRouter();
    const { email = 'mnezhurin17@gmail.com' } = props;
    const [formState, formAction] = useFormState(verifyCodeAction, { code: ''});
    // const [codeValue, setCodeValue] = useState('');

    useEffect(() => {
        console.log('formState', formState)
    }, [formState.verified]);

    if (formState.verified) {
        router.push('/login')
    }

    console.log(formState)
    return (
        <div className="w-full max-w-md">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-3xl font-bold">Verification</CardTitle>
                    <CardDescription>
                        Enter verification code
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form action={formAction} className="space-y-2">
                        <Input
                            id="code2"
                            name="code2"
                            hidden
                            type="text"
                            defaultValue={email}
                            placeholder="code"
                        />
                        <Label htmlFor="name">Code</Label>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <InputOTP maxLength={6} name="code">
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <Button type="submit">Verify</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}