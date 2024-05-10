import {getUserToken} from "@/utils/getSessionUser";
import {NextApiRequest, NextApiResponse} from "next";

interface IParams {
    ids: string
}

export const dynamic = 'force-dynamic'
export const revalidate = false
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // @ts-ignore
        const { params }: { params: IParams } = res;
        const {ids} = params;
        const ingredients = ids.split(',');
        console.log('ingredients', ingredients);
        const token = await getUserToken();

        if (token) {
            if (!ingredients.length) {
                return new Response(JSON.stringify({ data: [] }), { status: 200});
            }
            const request = await fetch(`${process.env.API_URL}/api/recipes-by-ingredients?ingredients=[${ingredients}]`, {
                method: "GET",
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            })
            const data = await request.json();
            return new Response(JSON.stringify(data), { status: 200});
        }
        return new Response(JSON.stringify({ message: 'Unauthorized'}), { status: 300});
    } catch (error) {
        console.log('error', error);
        return new Response(JSON.stringify({ message: 'Internal server error'}), { status: 500})
    }

}