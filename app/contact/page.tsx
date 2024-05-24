'use client';
import {email} from "@/constants/contacts";
import {useSession} from "next-auth/react";

export default function ContactUs() {
    const { data: session = { user: { name: ''}} } = useSession();
    const { name = 'Guest' } = session?.user || {};

    return (<>
        <section className="container mt-5">
            <h1 className="text-4xl font-bold">Contact Us</h1>
        </section>

        <section>
            <div className="container">
                <h2 className="p-6 text-center">Here you can contact us</h2>

                <div>
                    <p>For any questions or concerns, please contact us at</p>
                </div>
            </div>

            <div className="container">
                Some dummy text
            </div>
        </section>

        <section className="flex flex-col items-center space-y-8">
            <p>For any questions or concerns, please contact us at <a href={`mailto:${email}`}>{email}</a></p>

            <div className="flex flex-col items-center space-y-8">
                Hello { name }
            </div>
        </section>
    </>)
}