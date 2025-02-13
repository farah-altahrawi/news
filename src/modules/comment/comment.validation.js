import joi from "joi";

export const createCommentSchema = joi.object({
    description:joi.string().min(5).required(),
});

export const commentIdSchema = joi.object({
    id:joi.number().min(1).required(),

});