import Joi from 'joi';
import config from '../../config.json';

const configSchema = Joi.object()
  .keys({
    env: Joi.string().valid('production', 'development').required(),
    port: Joi.number().min(1024).max(65535).default(3000),
    proxied: [Joi.boolean().invalid(true).required(), Joi.number().required()],
  })
  .unknown();

const validationResult = configSchema.prefs({ errors: { label: 'key' } }).validate(config);

if (validationResult.error) {
  const error = new Error(validationResult.error.message);
  error.name = 'Config Validation Error';
  throw error;
}

process.env['NODE_ENV'] = config.env;

export default {
  ...config,
};
