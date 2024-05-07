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
            {/*<DashboardComponent />*/}
            <h2>Hello {sessionUser?.user?.name}</h2>
            <div className="px-6 py-4">{children}</div>
        </>
    )
}