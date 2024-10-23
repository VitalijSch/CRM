export interface User {
    name: string;
    email: string;
    password: string;
    userProfile: File | null;
    rememberMe: boolean;
}
