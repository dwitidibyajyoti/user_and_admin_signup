import Joi from 'joi';

// Validation schema for registering an admin
const registerAdminSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    age: Joi.number().integer().min(18).max(100).required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
});

// Validation schema for logging in an admin
const loginAdminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
});

export { registerAdminSchema, loginAdminSchema };