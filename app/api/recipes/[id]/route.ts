import { getUserToken } from "@/utils/getSessionUser";
import {IParams} from "@/interfaces/api";
import {NextRequest} from "next/server";
import {NextApiResponse} from "next";

export const GET = async (req: NextRequest, res: NextApiResponse) => {
    try {
        // @ts-ignore
        const { params }: { params: IParams } = res;
        const {id} = params;

        const token = await getUserToken();

        if (token) {
            const request = await fetch(`${process.env.API_URL}/api/recipes/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            })
            const commentsReq = await fetch(`${process.env.API_URL}/api/recipes/${id}/comments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            const [comments, data] = await Promise.all([commentsReq.json(), request.json()]);
            const commentsData = comments.data || []

            return new Response(JSON.stringify({ data: {...data.data, comments: commentsData }}), {status: 200})
        }

        return new Response(JSON.stringify({message: 'Unauthorized'}), {status: 400})
    } catch (error) {
        return new Response(JSON.stringify({message: "Internal server error"}), {status: 500})
    }
};