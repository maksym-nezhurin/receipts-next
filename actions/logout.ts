import { signOut } from 'next-auth/react';

export async function logout () {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Вихід з NextAuth
        signOut({ redirect: false });
    } catch (error) {
        console.error(error);
    }
}