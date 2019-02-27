import { ChoiceField } from 'graphqlDefs';
import { isFunction } from 'lodash';

type fnOrString<T> = ((id: T) => string) | string;

export function createChoiceField<T extends number>(id: T, name: fnOrString<T>): ChoiceField {
    return { id, name: isFunction(name) ? name(id) : name };
}
