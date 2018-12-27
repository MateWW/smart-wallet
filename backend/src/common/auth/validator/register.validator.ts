import { PipeTransform, Injectable } from '@nestjs/common';
import * as yup from 'yup';

import { Register } from 'graphqlDefs';
import { UserEntity } from 'features/user/entities/user.entity';
import { validationErrorMessages } from 'common/errorHandler/models/validation.errors';

export const registerValidator = yup.object().shape({
    email: yup
        .string()
        .required(validationErrorMessages.required('Email'))
        .email(validationErrorMessages.email())
        .test('already_used', validationErrorMessages.alreadyUsed('email'), email =>
            UserEntity.find({ email }).then(entity => !!entity),
        ),
    password: yup
        .string()
        .required(validationErrorMessages.required('Password'))
        .trim()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            validationErrorMessages.password(),
        ),
    firstName: yup.string().required(validationErrorMessages.required('First name')),
    lastName: yup.string().required(validationErrorMessages.required('Last name')),
});

@Injectable()
export class RegisterPipe implements PipeTransform<any> {
    async transform({ data }: { data: Register }) {
        try {
            return await registerValidator.validate(data, { abortEarly: false });
        } catch (error) {
            throw error;
        }
    }
}
