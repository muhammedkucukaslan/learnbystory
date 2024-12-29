import { Request, Response } from 'express';
import { handleSuccessResponse, handleErrorResponse } from '../utils/functions';
import { IResponse, IResult } from '../types/global';

interface IUserService {
    getUser: (id: string) => Promise<IResult<User>>;
    deleteUser: (id: string) => Promise<IResult>;
    updateUser: (id: string, data: Updation) => Promise<IResult>;
}

export class UserHandler {
    private service: IUserService;

    constructor(service: IUserService) {
        this.service = service;
    }

    public async getUser(
        req: Request,
        res: Response
    ): Promise<IResponse<User>> {
        try {
            const id: string = req.headers['x-user-id'] as string;
            const result = await this.service.getUser(id);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse<User>(res, result.data);
        } catch (error) {
            console.error('error', error);
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async delete(req: Request, res: Response): Promise<IResponse> {
        try {
            const id: string = req.headers['x-user-id'] as string;
            const result = await this.service.deleteUser(id);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse(res, null, 204);
        } catch (error) {
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async update(req: Request, res: Response): Promise<IResponse> {
        try {
            const id: string = req.headers['x-user-id'] as string;
            const data = req.body;
            const result = await this.service.updateUser(id, data);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse(res, null, 204);
        } catch (error) {
            console.error('error', error);
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }
}

type User = {
    id: string;
    username: string;
    email: string;
};


type Updation = {
    language: {
        language: string;
        level: string;
    },
    interests: string[];
}