import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const tokenBlacklist: string[] = [];

export const isTokenBlacklisted = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token && tokenBlacklist.includes(token)) {
        res.status(401).json({ error: 'Token has been blacklisted' });
    } else {
        next();
    }
};
