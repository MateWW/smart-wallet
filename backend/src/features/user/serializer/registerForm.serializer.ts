import { Register } from 'graphqlDefs';
import { OmitEntity } from 'common/helpers/Omit';
import * as yup from 'yup';

import { UserEntity } from '../entities/user.entity';

type CreateModel = OmitEntity<UserEntity, 'id' | 'role' | 'createAt' | 'updatedAt'>;

export function serializeRegisterForm(registerForm: Register): CreateModel {
    return {
        ...registerForm,
    };
}
