import { User } from 'graphqlDefs';

export type JwtPayload = User;

export const initialUser = {
    id: 'xddd',
    email: 'test@test.com',
    firstName: 'first name',
    lastName: 'last name',
    role: 1,
};