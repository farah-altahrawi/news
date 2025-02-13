import joi from "joi";

export const createArticleSchema = joi.object({
    title:joi.string().min(3).max(15).required(),
    description:joi.string().min(10).required(),
});

export const articleIdSchema = joi.object({
    id:joi.number().min(1).required(),

});

