import { Router } from "express";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../middleware/validation.js";
import { createCommentSchema, commentIdSchema } from "./comment.validation.js";
import { getComment , createComment, deleteComment} from "./comment.controller.js";
import commentAuth from "../../middleware/commentAuth.js";
import userAuth from "../../middleware/userAuth.js";

const router = Router();

router.get('/',asyncHandler(getComment));

router.post('/',userAuth(),validation(createCommentSchema,'body'),asyncHandler(createComment));

router.delete('/:id',commentAuth(),validation(commentIdSchema,'params'),asyncHandler(deleteComment));

export default router;