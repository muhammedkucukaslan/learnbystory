import { Request, Response } from 'express';
import { handleSuccessResponse, handleErrorResponse } from '../utils/functions';
import { IResponse, IResult } from '../types/global';

interface IAuthService {
    signup: (
        username: string,
        email: string,
        password: string
    ) => Promise<IResult<{ token: string }>>;
    login: (
        email: string,
        password: string
    ) => Promise<IResult<{ token: string }>>;
}

interface IAuthHandler {
    signup: (req: Request, res: Response) => Promise<IResponse>;
    login: (req: Request, res: Response) => Promise<IResponse>;
    logout: (req: Request, res: Response) => Promise<IResponse>;
}

export class AuthHandler implements IAuthHandler {
    private service: IAuthService;

    constructor(service: IAuthService) {
        this.service = service;
    }

    public async signup(req: Request, res: Response): Promise<IResponse> {
        try {
            const { username, email, password } = req.body;
            const result = await this.service.signup(username, email, password);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }

            res.cookie('token', result.data.token);

            return handleSuccessResponse(res, null, 201);
        } catch (error) {
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async login(req: Request, res: Response): Promise<IResponse> {
        try {
            const { email, password } = req.body;
            const result = await this.service.login(email, password);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            res.cookie('token', result.data.token);
            return handleSuccessResponse(res, null);
        } catch (error) {
            console.log('LOGIN HANDLER ERROR', error);
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async logout(req: Request, res: Response): Promise<IResponse> {
        try {
            res.clearCookie('token');
            return handleSuccessResponse(res, null);
        } catch (error) {
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }
}
