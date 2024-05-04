import type {Metadata} from "next";
import DashboardComponent from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
    title: "Auth part of the site",
    description: "Auth only",
};
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/*<DashboardComponent />*/}
            <div>{children}</div>
        </>
    )
}