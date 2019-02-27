export interface AddProductInput {
    name: string;
    price: number;
    company?: string;
}

export interface BillInput {
    type: number;
    totalPrice: number;
    products?: ProductsAmountInput[];
    date: Date;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface Bill {
    id: string;
    user?: User;
    company?: Company;
    type?: ChoiceField;
    totalPrice?: number;
    products?: ProductsAmount[];
    date?: Date;
    photoUrl?: string;
    createAt?: Date;
    updatedAt?: Date;
}

export interface ChoiceField {
    id: number;
    name: string;
}

export interface Company {
    id: string;
    name?: string;
    nip?: string;
}

export interface IMutation {
    register(data?: RegisterData): string | Promise<string>;
    createBill(bill: BillInput): Bill | Promise<Bill>;
    addProduct(product: AddProductInput): Product | Promise<Product>;
}

export interface Product {
    id: string;
    user?: User;
    name?: string;
    price?: number;
    company?: Company;
}

export interface ProductsAmount {
    id: string;
    amount?: number;
    product?: Product;
}

export interface ProductsAmountInput {
    amount: number;
    product: AddProductInput;
}

export interface IQuery {
    signIn(credentials?: SignInData): string | Promise<string>;
    getBillsList(): Bill[] | Promise<Bill[]>;
    getBillTypes(): ChoiceField[] | Promise<ChoiceField[]>;
    getProducts(): Product[] | Promise<Product[]>;
    getUser(id: string): User | Promise<User>;
    temp__(): boolean | Promise<boolean>;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number;
}

export type Date = any;
