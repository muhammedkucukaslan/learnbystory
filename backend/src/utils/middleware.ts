import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { IResult } from '../types/global';
import { createErrorResult, createSuccessResult } from './functions';
import { jwtVerify } from 'jose';

const getJWTSecretKey = () => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error('JWT_SECRET is not defined');
    }
    return new TextEncoder().encode(secretKey);
};

async function verifyToken(token: string) {
    try {
        const payload = await jwtVerify(token, getJWTSecretKey());
        return payload;
    } catch (error) {
        console.error('error', error);
        return null;
    }
}

async function getUserFromCookies(
    req: Request
): Promise<IResult<{ id: string }>> {
    const token = req.cookies.token;
    if (!token) {
        return createErrorResult('Token not provided', 'TOKEN_NOT_PROVIDED');
    }

    try {
        const { payload } = await jwtVerify(token, getJWTSecretKey());
        if (!payload) {
            return createErrorResult('Invalid token', 'INVALID_TOKEN');
        }
        return createSuccessResult({ id: payload.id as string });
    } catch (error) {
        console.error('Error:', error);
        return createErrorResult('Invalid token', 'INVALID_TOKEN');
    }
}

const Auth_Pages = ['/login', '/signup'];
const isAuthPage = (pathname: string) =>
    Auth_Pages.some((page) => pathname.startsWith(page));

const Public_Pages = ['/', '/docs'];

const isPublicPage = (pathname: string) =>
    Public_Pages.some(
        (page) => pathname === page || pathname.startsWith(`${page}/`)
    );

const Auth_API_Pages = ['/api/login', '/api/signup'];

const isAuthAPIPage = (pathname: string) =>
    Auth_API_Pages.some(
        (page) => pathname === page || pathname.startsWith(page)
    );

function validateRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            ERR_CODE: 'VALIDATION_ERROR',
            message: errors.array().map((error: any) => error.msg).join(', '),
        });
        return
    }
    next();
}

export {
    getUserFromCookies,
    isAuthPage,
    isPublicPage,
    getJWTSecretKey,
    verifyToken,
    isAuthAPIPage,
    validateRequest,
};
