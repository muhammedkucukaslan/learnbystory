import { Result } from 'express-validator';
import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';
import { generatePrompt, askGPT } from './utils/functions';


interface IStoryRepository {
    getStories: (userId: string) => Promise<IResult<Stories>>;
    getStory: (id: string) => Promise<IResult<Story>>;
    create: (data: CreationStory) => Promise<IResult<{ id: string }>>;
    delete: (id: string) => Promise<IResult>;
    update: (id: string, point: number) => Promise<IResult>;
}

export class StoryService {
    private repository: IStoryRepository;

    constructor(repository: IStoryRepository) {
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
            console.error('error', error);

            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }


    public async getStory(id: string): Promise<IResult<Story>> {
        try {
            const result = await this.repository.getStory(id);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }

            return createSuccessResult(result.data);
        } catch (error) {
            console.error('error', error);

            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async create(data: BodyStory): Promise<IResult<{ id: string }>> {
        try {


            const prompt = generatePrompt(data.language, data.level, data.interest, data.length);

            const aiResult = await askGPT(prompt) as IResult<ResponsePrompt>;
            if (!aiResult.success) {
                return createErrorResult(aiResult.message, aiResult.ERR_CODE);
            }

            const createdStoryResult = await this.repository.create({
                userId: data.userId,
                interest: data.interest,
                level: data.level,
                length: data.length,
                language: data.language,
                difficulty: data.difficulty,
                createdAt: new Date(), // Assign the current date or a proper date value here
                ...aiResult.data
            })

            if (!createdStoryResult.success) {
                return createErrorResult(createdStoryResult.message, createdStoryResult.ERR_CODE);
            }


            return createSuccessResult({ id: createdStoryResult.data.id });
        } catch (error) {
            console.error(error);
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
            console.error('error', error);

            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async update(id: string, point: number): Promise<IResult<null>> {
        try {
            const result = await this.repository.update(id, point);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }
            return createSuccessResult(null);
        } catch (error) {
            console.error('error', error);

            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }
}

interface ResponsePrompt {
    title: string;
    content: string;
    questions: Question[];
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
    interest: string;
    level: string;
    difficulty: string;
    language: string;
    length: number;
    title: string;
    content: string;
    questions: Question[];
    createdAt: Date;
}
type CreationQuestion = {
    text: string;
    options: string[];
    correctAnswer: number;
}


type BodyStory = {
    userId: string;
    insterests: string[];
    level: string;
    difficulty: string;
    interest: string;
    language: string;
    length: number;
}