'use client';
import {email} from "@/constants/contacts";
import {useSession} from "next-auth/react";

export default function ContactUs() {
    const { data: session = { user: { name: ''}} } = useSession();
    const { name = 'Guest' } = session?.user || {};

    return (<div>
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <div className="flex flex-col items-center space-y-8">
            <p>For any questions or concerns, please contact us at <a href={`mailto:${email}`}>{email}</a></p>

            <div className="flex flex-col items-center space-y-8">
                Hello { name }
            </div>
        </div>
    </div>)
}