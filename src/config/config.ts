import Joi from 'joi';
import config from '../../config.json';

// Credits: https://gist.github.com/Aterfax/401875eb3d45c9c114bbef69364dd045
const cronExpressionRegex = /^((((\d+,)+\d+|(\d+(\/|-|#)\d+)|\d+L?|\*(\/\d+)?|L(-\d+)?|\?|[A-Z]{3}(-[A-Z]{3})?) ?){5,7})$/;

const configSchema = Joi.object()
  .keys({
    env: Joi.string().valid('production', 'development').required(),
    port: Joi.number().min(1024).max(65535).default(3000),
    proxied: [Joi.boolean().invalid(true).required(), Joi.number().required()],
    enabledSites: Joi.object({
      genshinImpactFandom: Joi.boolean().required(),
      game8: Joi.boolean().required(),
      rockpapershotgun: Joi.boolean().required(),
      vg247: Joi.boolean().required(),
      pcgamesn: Joi.boolean().required(),
      gamerant: Joi.boolean().required(),
    }).required(),
    schedulers: Joi.object({
      scrapeGenshinCodes: Joi.string().pattern(cronExpressionRegex).message('"scrapeGenshinCodes" contains an invalid cron expression value').required(),
    }).required(),
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
