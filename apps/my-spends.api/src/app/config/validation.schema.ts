import Joi from 'joi';

export const validationSchema = Joi.object({
  APP_PORT: Joi.number(),
  // Database
  DB_CONNECTION: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  // Hash
  HASH_SALT: Joi.number().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});
