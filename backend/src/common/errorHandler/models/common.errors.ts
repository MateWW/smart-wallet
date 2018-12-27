export interface CommonError {
    readonly type: string;
}

export const NOT_FOUND_ERROR = 'NOT_FOUND_ERROR';
export class NotFound implements CommonError {
    public readonly type = NOT_FOUND_ERROR;
    constructor(public message: string) {}
}

export const UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR';
export class Unauthorized implements CommonError {
    public readonly type = UNAUTHORIZED_ERROR;
}

export const FORBIDDEN_ERROR = 'FORBIDDEN_ERROR';
export class Forbidden implements CommonError {
    public readonly type = FORBIDDEN_ERROR;
}

export type CommonErrors = NotFound | Unauthorized | Forbidden;
