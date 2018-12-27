
export type Omit<T, F> = Pick<T, Exclude<keyof T, F>>;
export type OmitEntity<T, F> = Pick<T, Exclude<keyof T, F | 'hasId' | 'save' | 'remove' | 'reload'>>;
