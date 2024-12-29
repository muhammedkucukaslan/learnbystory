import { Request, Response } from 'express';
import { handleSuccessResponse, handleErrorResponse } from '../utils/functions';
import { IResponse, IResult } from '../types/global';

interface IStoryService {
    getStories: (userId: string) => Promise<IResult<Stories>>;
    getStory: (id: string) => Promise<IResult<Story>>;
    create: (data : CreationStory) => Promise<IResult<Story>>;
    delete: (id: string) => Promise<IResult>;
}

export class StoryHandler {
    private service: IStoryService;

    constructor(service: IStoryService) {
        this.service = service;
    }

    public async getStory(
        req: Request,
        res: Response
    ): Promise<IResponse<Story>> {
        try {
            const id: string = req.params.id;
            const result = await this.service.getStory(id);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse<Story>(res, result.data);
        } catch (error) {
            console.error('error', error);
            return handleErrorResponse(
                res,
                'SERVER_ERROR',
                'Internal server error'
            );
        }
    }

    public async getStories(req: Request, res: Response): Promise<IResponse<Stories>> {
        try {
            const userId: string = req.headers['x-user-id'] as string;
            const result = await this.service.getStories(userId);
            if (!result.success) {
                return handleErrorResponse(
                    res,
                    result.ERR_CODE,
                    result.message
                );
            }
            return handleSuccessResponse<Stories>(res, result.data);
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
            const id: string = req.params.id;
            const result = await this.service.delete(id);
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

    public async create(req: Request, res: Response): Promise<IResponse> {
        try {
            const id: string = req.headers['x-user-id'] as string;
            const { data } = req.body;
            const result = await this.service.create({userId: id, ...data});
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


type CreationStory = {
    userId : string;
    interest: string;
    level: string;
    language: string;
    length: number;
}