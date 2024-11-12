import { Request, Response } from 'express';
import * as userService from '../services';
import { handleError } from '../utils';

// Create a new user (Admin use case, or extend as needed)
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        handleError(res, error);
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        handleError(res, error);
    }
};
