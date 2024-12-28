import { Router, Request, Response } from 'express';
import { IResponse } from '../types/global';
import { validateRequest } from '../utils/middleware';
import { userValidation } from './utils/validation';

interface IStoryHandler {
    getStories: (req: Request, res: Response) => Promise<IResponse<Stories>>;
    getStory: (req: Request, res: Response) => Promise<IResponse<any>>;
    delete: (req: Request, res: Response) => Promise<IResponse>;
    create: (req: Request, res: Response) => Promise<IResponse>;
}

export class UserRouter {
    constructor(private handler: IStoryHandler) {
        this.getStory = this.getStory.bind(this);
        this.getStoryes = this.getStoryes.bind(this);
        this.create = this.getStoryes.bind(this);
        this.delete = this.delete.bind(this);
    }

    public getRouter() {
        const router = Router();
        router.get('/', this.getStoryes);
        router.post('/', userValidation, validateRequest, this.create);
        router.delete('/', this.delete);
        return router;
    }

    private async getStoryes(req: Request, res: Response) {
        try {
            await this.handler.getStories(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    private async getStory(req: Request, res: Response) {
        try {
            await this.handler.getStory(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    private async create(req: Request, res: Response) {
        try {
            await this.handler.create(req, res);
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



type SingleStory = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    questions:
    {
        id: string;
        question: string;
        answer: string;
    }[];

}


type Story = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    questions:
    {
        id: string;
        question: string;
        answer: string;
    }[];
}


type Stories = {
    id: string,
    title: string,
    field: string,
    result: number,
    createdAt: string
}[]