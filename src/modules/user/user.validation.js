import joi from "joi";

export const userIdSchema = joi.object({
    id:joi.number().min(1).required(),

});