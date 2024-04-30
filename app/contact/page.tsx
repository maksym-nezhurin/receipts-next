import {email} from "@/constants/contacts";

export default function ContactUs() {
    return (<div>
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <div className="flex flex-col items-center space-y-8">
            <p>For any questions or concerns, please contact us at <a href={`mailto:${email}`}>{email}</a></p>
        </div>
    </div>)
}