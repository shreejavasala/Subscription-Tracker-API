import { Router } from 'express';

import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

/*
userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));
*/

userRouter.put('/:id', authorize, updateUser);

userRouter.get('/:id', authorize, deleteUser);

export default userRouter;