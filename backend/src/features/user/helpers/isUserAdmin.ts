import { User } from 'graphqlDefs';

import { UserRole } from '../enum/userRole.enum';

export function isUserAdmin({ role }: User): boolean {
    return role === UserRole.ADMIN;
}
