export type User = {
    name: string;
    email: string;
    password: string;
}

export type UserSession = {
    user: {
        name: string,
        email: string,
        image: string
    }
}
