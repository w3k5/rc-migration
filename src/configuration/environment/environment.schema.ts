import * as Joi from 'joi';

const schema = Joi.object({
  // DATABASE_HOST: Joi.string().required(),
  // DATABASE_PORT: Joi.number().required(),
  // DATABASE_SCHEMA: Joi.string().required(),
  // DATABASE_USER: Joi.string().required(),
  // DATABASE_PASSWORD: Joi.string().required(),
  // DATABASE_NAME: Joi.string().required(),
  APPLICATION_PORT: Joi.number().required(),
  YDB_ENDPOINT: Joi.string().required(),
  YDB_DATABASE: Joi.string().required(),
  YDB_USER: Joi.string().required(),
  YDB_PASSWORD: Joi.string().required(),
});

export default schema;
