export interface ISession {
    user: IUser;
    accessToken: string;
    expires: string;
}

interface IUser {
    id: string;
    avatar: string;
    accessToken: string;
    name: string;
    email: string;
    image: string;
}