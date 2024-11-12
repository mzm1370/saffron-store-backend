import express from 'express';
import * as userController from '../controllers';
import { protect, admin } from '../middlewares';

const router = express.Router();

router.post('/', protect, admin, userController.createUser);
router.get('/', protect, userController.getUsers);
router.get('/:id', protect, userController.getUser);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, admin, userController.deleteUser);

export default router;
