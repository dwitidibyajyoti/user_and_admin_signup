import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});