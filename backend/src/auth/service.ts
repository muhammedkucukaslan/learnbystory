import { IResult } from '../types/global';
import { createSuccessResult, createErrorResult } from '../utils/functions';
import { hashPassword, comparePassword } from './utils/password';
import { generateToken } from './utils/token';

interface IAuthRepository {
    isEmailValid: (email: string) => Promise<IResult>;
    signup: (
        username: string,
        email: string,
        password: string
    ) => Promise<IResult<{ token: string }>>;
    getPasswordAndId: (
        email: string
    ) => Promise<IResult<{ password: string; id: string }>>;
}

export class AuthService {
    private repository: IAuthRepository;

    constructor(repository: IAuthRepository) {
        this.repository = repository;
    }

    public async signup(
        username: string,
        email: string,
        password: string
    ): Promise<IResult<{ token: string }>> {
        try {
            const isEmailValid = await this.repository.isEmailValid(email);
            if (!isEmailValid.success) {
                return createErrorResult(
                    isEmailValid.message,
                    isEmailValid.ERR_CODE
                );
            }
            const hashedPassword = await hashPassword(password);

            const result = await this.repository.signup(
                username,
                email,
                hashedPassword
            );

            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }

            const token = await generateToken(result.data.token);

            return createSuccessResult({ token });
        } catch (error) {
            console.log(error);
            return createErrorResult('Error signing up', 'SERVER_ERROR');
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<IResult<{ token: string }>> {
        try {
            const result = await this.repository.getPasswordAndId(email);
            if (!result.success) {
                return createErrorResult(result.message, result.ERR_CODE);
            }

            const isPasswordValid = await comparePassword(
                password,
                result.data.password
            );
            if (!isPasswordValid) {
                return createErrorResult(
                    'Invalid email or password',
                    'INVALID_CREDENTIALS'
                );
            }
            const token = await generateToken(result.data.id);
            return createSuccessResult({ token });
        } catch (error) {
            return createErrorResult('Error logging in', 'SERVER_ERROR');
        }
    }
}
