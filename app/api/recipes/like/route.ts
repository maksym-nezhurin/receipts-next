import { getUserToken } from "@/utils/getSessionUser";
import {NextApiResponse} from "next";
import {NextRequest} from "next/server";

export const POST = async (req: Request | NextRequest, res: NextApiResponse) => {
    try {
        const data = await req.json();
        const token = await getUserToken();

        if (token) {
            const request = await fetch(`${process.env.API_URL}/api/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ recipe_id: data.recipeId  })
            })
            const data2 = await request.json();
            return new Response(JSON.stringify({ ...data2 }), { status: 200 })
        }

        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 400 })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}