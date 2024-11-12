import { Response } from 'express';

export const handleError = (res: Response, error: any): void => {
    if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
        res.status(400).json({ message: 'Duplicate key error' });
    } else if (error.name === 'CastError') {
        res.status(404).json({ message: 'Resource not found' });
    } else {
        res.status(500).json({ message: 'Server error' });
    }
};
