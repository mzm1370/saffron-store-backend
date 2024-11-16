import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, IUser } from '../models';

const tokenBlacklist: string[] = [];

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const isTokenBlacklisted = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Authorization token missing' });
        return;
    }

    if (tokenBlacklist.includes(token)) {
        res.status(401).json({ error: 'Token has been blacklisted' });
        return;
    }

    next();
};

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey') as JwtPayload;

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401).json({ message: 'User not found' });
                return;
            }

            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const admin = (req: any, res: Response, next: NextFunction): void => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
