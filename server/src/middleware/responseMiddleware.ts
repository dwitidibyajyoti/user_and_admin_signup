import { Response, Request, NextFunction } from 'express';

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.error = (code: number, message: string): Response => {
        return res.status(code).json({
            success: false,
            message,
            data: null,
        });
    };

    res.success = <T>(code: number, message: string, data?: T): Response => {
        return res.status(code).json({
            success: true,
            message,
            data,
        });
    };

    next();
};

export default responseMiddleware;
