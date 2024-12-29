import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';
import prisma from '../config/db';

interface IUserRepository {
    getUser: (id: string) => Promise<IResult<User>>;
    delete: (id: string) => Promise<IResult>;
    updateUser: (id: string, data: Updation) => Promise<IResult>;
}

export class UserRepository implements IUserRepository{
    private db: typeof prisma;

    constructor(dbClient: typeof prisma) {
        this.db = dbClient;
    }

    public async getUser(id: string): Promise<IResult<User>> {
        try {
            const result = await this.db.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    interests: true,
                    languages: {
                        select: {
                            language: true,
                            level: true
                        }
                    }
                }
            })

            if (!result) {
                return createErrorResult('User not found', 'USER_NOT_FOUND');
            }

            return createSuccessResult({
                id: result.id,
                username: result.name,
                email: result.email,
                interests: result.interests,
                languages: result.languages
            });
        } catch (error) {
            console.error('error', error);
            return createErrorResult('Error fetching user', 'SERVER_ERROR');
        }
    }

    public async delete(id: string): Promise<IResult> {
        try {
            const result = await this.db.user.delete({
                where: { id }
            });
            if (!result) {
                return createErrorResult('Error deleting user', 'SERVER_ERROR');
            }

            return createSuccessResult(null);
        } catch (error) {
            console.error('error', error);
            return createErrorResult('Error deleting user', 'SERVER_ERROR');
        }
    }

    public async updateUser(id: string, data: Updation): Promise<IResult> {
        try {
            const result = await this.db.user.update({
                where: { id },
                data : {
                    languages: {
                        create: data.languages
                    },
                    interests: {
                        set: data.interests
                    }
                }
            });
            if (!result) {
                return createErrorResult('Error updating user', 'SERVER_ERROR');
            }

            return createSuccessResult(null);
        } catch (error) {
            console.error('error', error);

            return createErrorResult('Error updating user', 'SERVER_ERROR');
        }
    }
}

type User = {
    id: string;
    username: string;
    email: string;
    interests: string[];
    languages: Language[];
};

type Language = {
    language: String
    level: String
}

type Updation = { 
    languages: {
        language: string;
        level: string;
    }[],
    interests: string[];
}