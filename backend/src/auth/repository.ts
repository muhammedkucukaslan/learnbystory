import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';
import prisma from '../config/db';

export class AuthRepository {
    private db: typeof prisma;

    constructor(dbClient: typeof prisma) {
        this.db = dbClient;
    }

    public async isEmailValid(email: string): Promise<IResult> {
        try {

            const result = await this.db.user.findUnique({
                where: { email }
            })

            if (result) {
                return createErrorResult('Email already exists', 'EMAIL_EXISTS');
            }

            return createSuccessResult(null);
        } catch (error) {
            console.log(error);
            return createErrorResult('Error checking email', 'SERVER_ERROR');
        }
    }

    public async signup(
        username: string,
        email: string,
        password: string
    ): Promise<IResult<{ token: string }>> {
        try {
            const result = await this.db.user.create({
                data: {
                    email,
                    name: username,
                    password,
                }
            })

            if (!result) {
                return createErrorResult('Error signing up', 'SERVER_ERROR')
            }

            return createSuccessResult({ token: result.id });
        } catch (error) {
            console.log(error);
            return createErrorResult('Error signing up', 'SERVER_ERROR');
        }
    }

    public async getPasswordAndId(
        email: string
    ): Promise<IResult<{ password: string; id: string }>> {
        try {
            const result = await this.db.user.findUnique({
                where: { email }
            })

            if (!result) {
                return createErrorResult('Invalid email', 'INVALID_EMAIL');
            }

            return createSuccessResult({
                id: result.id,
                password: result.password,
            });
        } catch (error) {
            return createErrorResult('Error logging in', 'SERVER_ERROR');
        }
    }
}
