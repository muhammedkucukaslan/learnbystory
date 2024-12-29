import { Response } from 'express';

type SuccessResult<T> = {
    success: true;
    data: T;
};

type ErrorResult = {
    success: false;
    message: string;
    ERR_CODE: string;
};

type ApiResponse<T> = Response<T>;
type ApiError = Response<{
    message: string;
    ERR_CODE: string;
}>;

type IResponse<T = null> = ApiResponse<T> | ApiError;
type IResult<T = null> = SuccessResult<T> | ErrorResult;

export type {
    SuccessResult,
    ApiResponse,
    ApiError,
    ErrorResult,
    IResponse,
    IResult,
};
