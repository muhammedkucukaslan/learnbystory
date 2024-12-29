import { Router, Request, Response } from 'express';
import { IResponse } from '../types/global';


interface IStoryHandler {
    getStories: (req: Request, res: Response) => Promise<IResponse<Stories>>;
    getStory: (req: Request, res: Response) => Promise<IResponse<any>>;
    delete: (req: Request, res: Response) => Promise<IResponse>;
    create: (req: Request, res: Response) => Promise<IResponse>;
    update: (req: Request, res: Response) => Promise<IResponse>;
}

export class StoryRouter {
    constructor(private handler: IStoryHandler) {
        this.getStory = this.getStory.bind(this);
        this.getStoryes = this.getStoryes.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    public getRouter() {
        const router = Router();
        router.get('/', this.getStoryes);
        router.post('/', this.create);
        router.get('/:id', this.getStory);
        router.delete('/:id', this.delete);
        router.put('/:id', this.update);
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
            console.log(error)
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

    private async update(req: Request, res: Response) {
        try {
            await this.handler.update(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}



interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
}


type Story = {
    id: string;
    userId: string;
    interest: string;  // typo düzeltildi: insterests -> interests
    level: string;
    difficulty: string;
    language: string;
    length: number;
    title: string;
    content: string;
    questions: Question[];  // Question yerine questions olmalı
    createdAt: Date;  // createdAt, string yerine Date tipinde olmalı
}

type Stories = {
    id: string,
    title: string,
    interest: string, // Burada string[] olarak düzenlendi
    language: string,
    level: string,
    length: number,
    difficulty: string,
    result: number | null, // Burada score null olabileceği için number | null yaptık
    createdAt: Date
}[]



type CreationStory = {
    userId: string;
    insterests: string[];
    level: string;
    difficulty: string;
    language: string;
    length: number;
}