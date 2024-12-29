import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';
import prisma from '../config/db';


interface IStoryRepository {
    getStories: (userId: string) => Promise<IResult<Stories>>;
    getStory: (id: string) => Promise<IResult<Story>>;
    create: (data: Story) => Promise<IResult<{ id: string }>>;
    delete: (id: string) => Promise<IResult>;
}
export class StoryRepository implements IStoryRepository {
    private db: typeof prisma;

    constructor(dbClient: typeof prisma) {
        this.db = dbClient;
    }

    public async create(data: Story): Promise<IResult<{ id: string }>> {
        try {
            await this.db.story.create({
                data: {
                    userId: data.userId,
                    interest: data.interest,
                    level: data.level,
                    language: data.language,
                    difficulty: data.difficulty,
                    length: data.length,
                    title: data.title,
                    content: data.content,
                    Question: {
                        create: data.questions.map((question) => ({
                            text: question.text,
                            options: question.options,
                            answer: question.options[question.correctAnswer], // Doğru cevabı kaydediyoruz
                            correctAnswer: question.correctAnswer,
                        }))
                    }
                }
            });
            return createSuccessResult({ id: data.id });
        } catch (error) {
            console.error(error);
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async delete(id: string): Promise<IResult> {
        try {
            const deleteQuestions = this.db.question.deleteMany({
                where: {
                    storyId: id
                }
            })


            const deleteStory = this.db.story.delete({
                where: {
                    id
                }
            });


            await this.db.$transaction([deleteQuestions, deleteStory]);

            return createSuccessResult(null);
        } catch (error) {
            console.error(error);
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async getStories(userId: string): Promise<IResult<Stories>> {
        try {
            const stories = await this.db.story.findMany({
                where: {
                    userId
                },
                select: {
                    id: true,
                    title: true,
                    interest: true,
                    language: true,
                    length: true,
                    level: true,
                    difficulty: true,
                    result: {
                        select: {
                            score: true
                        }
                    },
                    createdAt: true
                }
            });

            if (!stories) {
                return createErrorResult('Stories not found', 'NOT_FOUND');
            }

            const formattedStories = stories.map(story => ({
                ...story,
                result: story.result ? story.result.score : null
            }));

            return createSuccessResult(formattedStories);
        } catch (error) {
            console.error(error);
            return createErrorResult('Internal server error', 'SERVER_ERROR');
        }
    }

    public async getStory(id: string): Promise<IResult<Story>> {
        try {
            const story = await this.db.story.findUnique({
                where: { id },
                select: {
                    id: true,
                    userId: true,
                    title: true,
                    content: true,
                    interest: true,
                    language: true,
                    length: true,
                    level: true,
                    difficulty: true,
                    createdAt: true,
                    Question: {
                        select: {
                            id: true,
                            text: true,
                            options: true,
                            correctAnswer: true
                        }
                    }
                }
            });

            if (!story) {
                return createErrorResult('Story not found', 'NOT_FOUND');
            }

            // 'Question' alanını 'questions' olarak yeniden adlandırıyoruz
            const formattedStory = {
                ...story,
                questions: story.Question ,  // 'Question' -> 'questions'
                createdAt: story.createdAt  // Date tipini olduğu gibi kullanıyoruz
            };

            const { Question, ...restOfFormattedStory } = formattedStory;
            return createSuccessResult(restOfFormattedStory);
        } catch (error) {
            console.error(error);
            return createErrorResult('Internal server error', 'SERVER_ERROR');
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
    interest: string; 
    level: string;
    difficulty: string;
    language: string;
    length: number;
    title: string;
    content: string;
    questions: Question[];
    createdAt: Date;  // createdAt, string yerine Date tipinde olmalı
}


type Stories = {
    id: string,
    title: string,
    interest: string, 
    language: string,
    level: string,
    length: number,
    difficulty: string,
    result: number | null, // Burada score null olabileceği için number | null yaptık
    createdAt: Date
}[]
