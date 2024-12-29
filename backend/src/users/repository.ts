import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';
import prisma from '../config/db';

export class UserRepository {
    private db: typeof prisma;

    constructor(dbClient: typeof prisma) {
        this.db = dbClient;
    }

    public async getUser(id: string): Promise<IResult<User>> {
        try {
            const result = await this.db.user.findUnique({
                where: { id }
            })

            if (!result) {
                return createErrorResult('User not found', 'USER_NOT_FOUND');
            }

            return createSuccessResult({
                id: result.id,
                username: result.name,
                email: result.email
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

    public async updateUser(id: string, username: string): Promise<IResult> {
        try {
            const result = await this.db.user.update({
                where: { id },
                data: { name: username }
            });
            if (!result) {
                return createErrorResult('Error updating user', 'SERVER_ERROR');
            }
            
            return createSuccessResult(null);
        } catch (error) {
            return createErrorResult('Error updating user', 'SERVER_ERROR');
        }
    }
}

type User = {
    id: string;
    username: string;
    email: string;
};
