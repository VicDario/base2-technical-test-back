import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const envs = registerAs('config', () => ({
  mongoUrl: process.env.MONGO_URI,
  port: parseInt(process.env.PORT, 10),
  apiSeedUrl: process.env.API_SEED_URI,
}));

export const validateConfig = Joi.object({
  MONGO_URI: Joi.string().uri().required(),
  PORT: Joi.number().required(),
  API_SEED_URI: Joi.string().uri().required(),
});
