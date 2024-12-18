import express from 'express';
import { register, login, modify, remove } from '../../controller/user/userController.js';

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.put("/modify", modify)
userRouter.delete("/remove", remove)

export default userRouter;