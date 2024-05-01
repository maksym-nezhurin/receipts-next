import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Auth page",
    description: "Page for authorization"
};
export default function AuthLayout ({
                                 children,
                             }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h3 className="text-2xl font-bold text-center py-4">Welcome to Authorization page!</h3>
            <div className='flex justify-center items-center mt-4'>
                {children}
            </div>
        </div>
    )
}