import express from 'express'
import * as authController from '../controllers'
import {
    isTokenBlacklisted
} from '../middlewares';

const router = express.Router();

router.post('/signup', async (req, res) => {
    await authController.signupUser(req, res);
});
router.post('/login', async (req, res) => {
    await authController.loginUser(req, res);
});
router.post('/logout', isTokenBlacklisted, authController.logoutUser);

export const authRoutes = router;