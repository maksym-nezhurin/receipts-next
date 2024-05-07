import { signOut } from 'next-auth/react';

export async function logout () {
    try {
        console.log('request')
        await fetch(`${process.env.API_URL}/api/logout`, {
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