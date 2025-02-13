import {Router} from 'express';
import { registerSchema , loginSchema} from './auth.validation.js';
import validation from '../../middleware/validation.js';
import { register } from './auth.controller.js';
import { login } from './auth.controller.js';
import { asyncHandler } from '../../utils/catchError.js';

const router = Router();


router.post('/register',validation(registerSchema),asyncHandler(register));

router.post('/login',validation(loginSchema),asyncHandler(login));


export default router; 