import { Router } from "express";
import auth from '../../middleware/auth.js';
import { createArticle, getArticle, getDetails, deleteArticle, uploudArticleImage } from "./article.controller.js";
import { asyncHandler } from "../../utils/catchError.js";
import validation from "../../middleware/validation.js";
import { createArticleSchema, articleIdSchema } from "./article.validation.js";
import fileUpload from "../../utils/multer.js";
import articleAuth from "../../middleware/articleAuth.js";

const router = Router();

router.get('/',asyncHandler(getArticle));

router.post('/',auth(),validation(createArticleSchema,'body'),asyncHandler(createArticle));

router.get('/:id',validation(articleIdSchema,'params'),asyncHandler(getDetails));

router.delete('/:id',auth(),validation(articleIdSchema,'params'),asyncHandler(deleteArticle));

router.put('/:id',articleAuth(),validation(articleIdSchema,'params'),fileUpload().single('image'),asyncHandler(uploudArticleImage));




export default router;