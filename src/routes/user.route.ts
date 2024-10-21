import { Router } from 'express';
import { createUser, loginUser, logoutUser } from '../controllers';
import {
    isTokenBlacklisted
} from '../middlewares';

const router = Router();

router.post('/signup', async (req, res) => {
    await createUser(req, res);
});
router.post('/login', async (req, res) => {
    await loginUser(req, res);
});

router.post('/logout', isTokenBlacklisted, logoutUser);

export const userRoutes = router;