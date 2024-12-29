import { Router, Request, Response } from 'express';
import { IResponse } from '../types/global';
import { validateRequest } from '../utils/middleware';
import { signupValidation, loginValidation } from './utils/validation';

interface IAuthHandler {
    signup: (req: Request, res: Response) => Promise<IResponse>;
    login: (req: Request, res: Response) => Promise<IResponse>;
    logout: (req: Request, res: Response) => Promise<IResponse>;
}

export class AuthRouter {
    constructor(private handler: IAuthHandler) {
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public getRouter() {
        const router = Router();
        router.post('/signup', signupValidation, validateRequest, this.signup);
        router.post('/login', loginValidation, validateRequest, this.login);
        router.post('/logout', this.logout);
        return router;
    }

    private async signup(req: Request, res: Response) {
        await this.handler.signup(req, res);
    }

    private async login(req: Request, res: Response) {
        await this.handler.login(req, res);
    }

    private async logout(req: Request, res: Response) {
        await this.handler.logout(req, res);
    }
}
