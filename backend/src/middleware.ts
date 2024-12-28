import { Request, Response, NextFunction } from 'express';
import {
    getUserFromCookies,
    isAuthPage,
    isPublicPage,
    isAuthAPIPage,
} from './utils/middleware';

export default async function middleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { originalUrl, path } = req;

    const isAuthAPIRequest = isAuthAPIPage(path);

    if (isAuthAPIRequest) {
        return next();
    }

    const result = await getUserFromCookies(req);
    const isAuthPageRequest = isAuthPage(originalUrl);

    if (isPublicPage(originalUrl)) {
        return next();
    }

    if (isAuthPageRequest) {
        if (!result.success) {
            res.clearCookie('token');
            return next();
        }
        return res.redirect('/');
    }

    if (!result.success) {
        res.clearCookie('token');
        return res.redirect('/login');
    }

    req.headers['x-user-id'] = result.data.id;
    next();
}
