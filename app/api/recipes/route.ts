import { getUserToken } from "@/utils/getSessionUser";
import {NextApiRequest, NextApiResponse} from "next";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const token = await getUserToken();
        console.log('token in the route +++', token)
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