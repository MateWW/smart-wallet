import { GraphQLError } from 'graphql/error';
import { ValidationError } from 'yup';

export const handleError = (error: GraphQLError) => {
    const { originalError } = error;
    if (originalError instanceof ValidationError) {
        return originalError;
    }
    return error;
};
