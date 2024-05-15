import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const envs = registerAs('config', () => ({
  mongoUrl: process.env.MONGO_URI,
  port: process.env.PORT,
}));

export const validateConfig = Joi.object({
  MONGO_URI: Joi.string().required(),
  PORT: Joi.number().required(),
})
