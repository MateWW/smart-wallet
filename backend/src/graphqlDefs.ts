export interface Register {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface SignIn {
    email: string;
    password: string;
}

export interface IMutation {
    register(data?: Register): string | Promise<string>;
}

export interface IQuery {
    signIn(credentials?: SignIn): string | Promise<string>;
    getUser(): User | Promise<User>;
    temp__(): boolean | Promise<boolean>;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number;
}
