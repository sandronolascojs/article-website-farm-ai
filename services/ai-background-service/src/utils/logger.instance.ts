import { Logger } from '@auto-articles/utils';
import { env } from '../config/env.config';

export const logger = new Logger({
  level: env.APP_ENV === 'development' ? 'debug' : 'info',
  serviceName: 'ai-background-service',
  isProd: env.APP_ENV === 'production',
});
