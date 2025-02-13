import {Router} from 'express';
import auth from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/catchError.js';
import { deleteUser, getUser, uploudUserImage } from './user.controller.js';
import { userIdSchema } from './user.validation.js';
import validation from '../../middleware/validation.js';
import fileUpload from '../../utils/multer.js';
import userAuth from '../../middleware/userAuth.js';

const router = Router();

router.get('/',asyncHandler(getUser));
router.delete('/:id',auth(),validation(userIdSchema,'params'),asyncHandler(deleteUser));
router.put('/:id',userAuth(),validation(userIdSchema,'params'),fileUpload().single('image'),asyncHandler(uploudUserImage));




export default router; 