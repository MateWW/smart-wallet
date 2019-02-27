import { GraphQLError } from 'graphql/error';
import { ValidationError } from 'yup';

export const handleError = (error: GraphQLError) => {
    const { originalError } = error;
    if (originalError instanceof ValidationError) {
        console.log(originalError);
        return originalError;
    }
    return error;
};
