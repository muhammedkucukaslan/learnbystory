import express from 'express'
import middleware from './middleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import timeout from 'connect-timeout';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(cookieParser());
app.use(middleware);
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(timeout('5s'));
app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: 100,
    })
);

import prisma from './config/db'
import { AuthRepository, AuthService, AuthHandler, AuthRouter } from './auth';
import { UserRepository, UserService, UserHandler, UserRouter } from './users';


const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authHandler = new AuthHandler(authService);
const authRouter = new AuthRouter(authHandler);

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);
const userRouter = new UserRouter(userHandler);

app.use('/api/users', userRouter.getRouter());
app.use('/api', authRouter.getRouter());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = 3000

app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})