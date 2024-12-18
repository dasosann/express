import express from 'express'
import passport from 'passport'
import { localStrategy } from '../../controller/auth/authController.js';

const authRouter = express.Router();
authRouter.post("/local", passport.authenticate('local', {session : false}), localStrategy)

export default authRouter;