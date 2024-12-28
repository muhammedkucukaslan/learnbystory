import { Response } from 'express';
import {
    ApiError,
    ApiResponse,
    ErrorResult,
    SuccessResult,
} from '../types/global';

function createSuccessResult<T>(data: T): SuccessResult<T> {
    return { success: true, data };
}

function createErrorResult<T>(message: string, ERR_CODE: string): ErrorResult {
    return { success: false, message, ERR_CODE };
}

const statusCodeMap: Record<string, number> = {
    SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    USER_NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TIMEOUT: 408,
    RATE_LIMIT_EXCEEDED: 429,
    SERVICE_UNAVAILABLE: 503,
    MISSING_REQUIRED_FIELD: 422,
    INVALID_CREDENTIALS: 401,
    SESSION_EXPIRED: 440,
    PASSWORD_TOO_WEAK: 400,
    DB_CONNECTION_ERROR: 500,
    FILE_TOO_LARGE: 413,
    INTERNAL_ERROR: 500,
    INVALID_TOKEN: 401,
    TOKEN_NOT_PROVIDED: 401,
};

const handleErrorResponse = (
    res: Response,
    ERR_CODE: string,
    message: string
): ApiError => {
    const statusCode = statusCodeMap[ERR_CODE] || 500;
    return res.status(statusCode).json({ message, ERR_CODE });
};

function handleSuccessResponse<T>(
    res: Response,
    data: T,
    code: number = 200
): ApiResponse<T> {
    return res.status(code).json(data);
}

export {
    createSuccessResult,
    createErrorResult,
    handleErrorResponse,
    handleSuccessResponse,
};
