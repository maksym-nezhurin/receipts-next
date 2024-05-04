import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
    try {
        // @ts-ignore
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return null;
        }

        return {
            user: session.user,
            // @ts-ignore
            userId: session.user.id
        }
    } catch (error) {
        console.log(error);

        return null;
    }
};

export const getUserToken = async () => {
    try {
        const sessionUser = await getSessionUser();
        // @ts-ignore
        const { user: { accessToken }} = sessionUser || {user: {token: null}};

        if (!accessToken) {
            return null;
        }

        return `Bearer ${accessToken}`;
    } catch (error) {
        console.log('Error in the geUser toke', error);
        return null;
    }
}
