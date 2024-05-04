import type {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {AdapterUser} from "next-auth/adapters";

interface IRequest {
    message: string;
    user: {
        id: number;
        name: string;
        avatar: string;
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

                    if (response.ok) {
                        const res: IRequest = await response.json();
                        const { message, user, access_token } = res;
                        return {
                            id: user.id,
                            name: user.name,
                            email: credentials?.email,
                            avatar: user.avatar,
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
        jwt: async ({ token, user }) => {
            if (user && !user.error) {
                token.user = user;
                token.accessToken = user.accessToken;
            } else {
                token.accessToken = null;
            }
            console.log('jwt')
            return token;
        },
        session: async ({ session, token }) => {
            console.log('session')
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