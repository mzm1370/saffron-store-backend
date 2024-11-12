import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import {
    User
} from '../models';

const tokenBlacklist: string[] = [];

export const signupUser = async (req: Request, res: Response): Promise<Response | void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};


export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


export const logoutUser = (req: Request, res: Response): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(400).json({ error: 'No token provided' });
    } else {
        try {
            jwt.verify(token, process.env.JWT_SECRET!);

            tokenBlacklist.push(token);

            res.status(200).json({ message: 'User logged out successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Invalid token' });
        }
    }
};