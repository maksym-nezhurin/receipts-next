import { NextResponse } from "next/server"
export async function POST(req: Request, res: Response) {
    try {
        const { name, email, password } = await req.json()
        // console.log('+++++', name, email, password)
        const a = await fetch(`${process.env.API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, password_confirmation: password }),
        })
        const ss = await a.json();
        console.log('post response ', ss)
        return NextResponse.json({ status: 200, message: ss.message, redirect: '/verification' })
    } catch (e) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
}