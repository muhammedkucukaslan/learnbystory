import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';


interface IStoryService {
    getStories: (userId: string) => Promise<IResult<Stories>>;
    getStory: (id: string) => Promise<IResult<Story>>;
    create: (data: CreationStory) => Promise<IResult>;
    delete: (id: string) => Promise<IResult>;
}


interface IUserRepository {
    getStories: (userId: string) => Promise<IResult<Stories>>;
    getUser: (id: string) => Promise<IResult<Story>>;
    create: (data: CreationStory) => Promise<IResult>;
    delete: (id: string) => Promise<IResult>;
}

export class StoryService implements IStoryService {
    private repository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    public async getStories(userId: string): Promise<IResult<Stories>> {
        try {
            const result = await this.repository.getStories(userId);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {   
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }


    public async getStory(id: string): Promise<IResult<Story>> {
        try {
            const result = await this.repository.getUser(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async create(data: CreationStory): Promise<IResult> {
        try {


            const result = await this.repository.create(dat);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(result.data);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async delete(id: string): Promise<IResult<null>> {
        try {
            const result = await this.repository.delete(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Internal server error', 'SERVER_ERROR');
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
    userId: string;
    interest: string;
    level: string;
    language: string;
    length: number;
}