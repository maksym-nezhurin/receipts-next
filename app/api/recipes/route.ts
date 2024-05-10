import { getUserToken } from "@/utils/getSessionUser";
import {NextApiResponse} from "next";
import {NextRequest} from "next/server";

export const GET = async (req: Request | NextRequest, res: NextApiResponse) => {
    try {
        const token = await getUserToken();

        const getData = (url = '') => fetch(`${process.env.API_URL}/api/${url}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": token || '',
            },
        })

        if (token) {
            const [likedRecipesRes, myRecipeRes] = await Promise.all([
                getData('liked-receipts'),
                getData('my-recipes')
            ])
            const [{ data: likedRecipes }, {data: myRecipes }] = await Promise.all([likedRecipesRes.json(), myRecipeRes.json()]);

            return new Response(JSON.stringify({ likedRecipes, myRecipes }), { status: 200 })
        }

        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 400 })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}