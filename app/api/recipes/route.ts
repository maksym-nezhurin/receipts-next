import { getUserToken } from "@/utils/getSessionUser";
import {NextApiResponse} from "next";
import {NextRequest} from "next/server";

export const GET = async (req: Request | NextRequest, res: NextApiResponse) => {
    try {
        const token = await getUserToken();

        if (token) {
            const request = await fetch(`${process.env.API_URL}/api/recipes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            })
            const data = await request.json();

            return new Response(JSON.stringify({ ...data }), { status: 200 })
        }

        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 400 })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}