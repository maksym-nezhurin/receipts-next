interface RegisterUserProps {
    name: string;
    password: string;
    email: string;
}

interface LoginUserProps {
    identifier: string;
    password: string;
}

const baseUrl = process.env.API_URL || "http://localhost:1337";

export async function registerUserService(userData: RegisterUserProps) {
    // const url = new URL("/api/register", baseUrl);


    try {
        const response = await fetch(`${process.env.BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
            cache: "no-cache",
        });
        // console.log('response', response)
        return response.json();
    } catch (error) {
        console.error("Registration Service Error:", error);
        throw error;
    }
}

export async function loginUserService(userData: LoginUserProps) {
    // const url = new URL("/api/login", baseUrl);

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
            cache: "no-cache",
        });

        return response.json();
    } catch (error) {
        console.error("Login Service Error:", error);
        throw error;
    }
}