import type {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface IRequest {
    message: string;
    user: {
        id: number;
        name: string;
        image: string;
    };
    success: boolean;
    access_token: string;

}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Your Email" },
                password: { label: "Password", type: "password" },
            },
            // @ts-ignore
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.API_URL}/sanctum/csrf-cookie`, {
                    method: "GET",
                })

                const setCookieHeader = res.headers.get("set-cookie")

                const cookies = setCookieHeader?.split(", ")
                let sessionKey = null
                let xsrfToken = null

                for (const cookie of cookies!) {
                    if (cookie.startsWith("laravel_session=")) {
                        sessionKey = cookie.split("=")[1]
                    } else if (cookie.startsWith("XSRF-TOKEN=")) {
                        xsrfToken = cookie.split("=")[1]
                    }

                    if (sessionKey && xsrfToken) {
                        break
                    }
                }

                if (!credentials?.email || !credentials?.password) {
                    return { error: 'Email and password are required' };
                }

                const data = {
                    email: credentials?.email,
                    password: credentials?.password,
                }
                const headers = new Headers({
                    Cookie: `laravel_session=${sessionKey}`,
                    "Content-Type": "application/json",
                })

                if (xsrfToken) {
                    headers.append("X-XSRF-TOKEN", xsrfToken)
                }

                const options = {
                    method: "POST",
                    headers,
                    body: JSON.stringify(data),
                }
                try {
                    const response = await fetch(`${process.env.API_URL}/api/login`, options)
                    const { data }: { data: IRequest} = await response.json();
                    if (response.ok) {

                        const { message, user, access_token } = data;
                        return {
                            id: user.id,
                            name: user.name,
                            email: credentials?.email,
                            avatar: user.image,
                            accessToken: access_token
                        };
                    } else {
                        // Handle non-successful response here, return an appropriate JSON response.
                        return { accessToken: null, error: "Authentication failed" }
                    }
                } catch (error) {
                    return { accessToken: null, error: "Authentication failed" }
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }: { token: any, user: any }) => {
            if (user && !user.error) {
                token.user = user;
                token.accessToken = user.accessToken;
            } else {
                token.accessToken = null;
            }
            console.log('jwt')
            return token;
        },
        session: async ({ session, token }: { session: any, token: any }) => {
            session.accessToken = token.accessToken;
            session.user = token.user || session.user;
            return session;
        }
    },
    pages: {
        signIn: '/signin',  // Шлях до вашої сторінки входу
    },
    // secret: process.env.NEXTAUTH_SECRET,
    // session: {
    //     strategy: "jwt"
    // },
    // jwt: {
    //     secret: process.env.JWT_SECRET,
    // }
}