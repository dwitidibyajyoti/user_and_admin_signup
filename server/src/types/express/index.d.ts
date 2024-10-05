// src/types/express.d.ts
import { Response } from 'express';

declare module 'express-serve-static-core' {
    interface Response {
        error: (code: number, message: string) => Response;
        success: (code: number, message: string, result: any) => Response;
    }
}

// src/@types/express.d.ts
import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user?: Record<string, any>
        }
    }
}