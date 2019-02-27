import * as yup from 'yup';
import { Injectable, PipeTransform } from '@nestjs/common';

import { SignInData } from 'graphqlDefs';
import { validationErrorMessages } from 'common/errorHandler/models/validation.errors';

const signInValidation = yup.object<SignInData>().shape({
    email: yup
        .string()
        .trim()
        .required(validationErrorMessages.required('Email'))
        .email(validationErrorMessages.email()),
    password: yup
        .string()
        .trim()
        .required(validationErrorMessages.required('Password')),
});

@Injectable()
export class SignInValidatorPipe implements PipeTransform<any> {
    async transform({ credentials }: Record<'credentials', SignInData>): Promise<SignInData> {
        return await signInValidation.validate(credentials);
    }
}
