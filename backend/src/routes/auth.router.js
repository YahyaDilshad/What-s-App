import express from "express";
const router = express.Router()
import { checkauth, login, logout, signup , updateprofile } from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/auth.middleware.js";
import { body } from 'express-validator'

router.post('/signup' ,[
 body('fullname').isLength({ min: 3 }).withMessage('fullname must be at least 3 characters long'),
 body('email').isEmail().withMessage('Invalid email'),
 body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
] , signup )

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], login)

router.post('/logout' , logout)

router.put('/update_profile' ,protectRoute , updateprofile )
router.get('/check' , protectRoute , checkauth )

export default router