import { PipeTransform, Injectable } from '@nestjs/common';
import * as yup from 'yup';

import { RegisterData } from 'graphqlDefs';
import { UserEntity } from 'features/user/entities/user.entity';
import { validationErrorMessages } from 'common/errorHandler/models/validation.errors';

const registerValidator = yup.object<RegisterData>().shape({
    email: yup
        .string()
        .required(validationErrorMessages.required('Email'))
        .email(validationErrorMessages.email())
        .test('already_used', validationErrorMessages.alreadyUsed('email'), email =>
            UserEntity.find({ email }).then(entity => !entity.length),
        ),
    password: yup
        .string()
        .required(validationErrorMessages.required('Password'))
        .trim()
        .min(8, validationErrorMessages.minLength('Password', 8))
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&$]/,
            validationErrorMessages.password(),
        ),
    firstName: yup.string().required(validationErrorMessages.required('First name')),
    lastName: yup.string().required(validationErrorMessages.required('Last name')),
});

interface InData {
    data: RegisterData;
}

@Injectable()
export class RegisterValidationPipe implements PipeTransform<any> {
    async transform({ data }: InData): Promise<RegisterData> {
        return await registerValidator.validate(data);
    }
}
