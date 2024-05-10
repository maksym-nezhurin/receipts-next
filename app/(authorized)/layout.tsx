import type {Metadata} from "next";
import {getSessionUser} from "@/utils/getSessionUser";

export const metadata: Metadata = {
    title: "Auth part of the site",
    description: "Auth only",
};
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const sessionUser = await getSessionUser();

    return (
        <>
            <div>{children}</div>
        </>
    )
}