import { Router, Request, Response } from 'express';
import { IResponse } from '../types/global';
import { validateRequest } from '../utils/middleware';
import { userValidation } from './utils/validation';

interface IUserHandler {
    getUser: (req: Request, res: Response) => Promise<IResponse<User>>;
    delete: (req: Request, res: Response) => Promise<IResponse>;
    update: (req: Request, res: Response) => Promise<IResponse>;
}

export class UserRouter {
    constructor(private handler: IUserHandler) {
        this.getUser = this.getUser.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    public getRouter() {
        const router = Router();
        router.get('/', this.getUser);
        router.put('/', userValidation, validateRequest, this.update);
        router.delete('/', this.delete);
        return router;
    }

    private async getUser(req: Request, res: Response) {
        try {
            await this.handler.getUser(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    private async update(req: Request, res: Response) {
        try {
            await this.handler.update(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    private async delete(req: Request, res: Response) {
        try {
            await this.handler.delete(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

type User = {
    id: string;
    username: string;
    email: string;
};
