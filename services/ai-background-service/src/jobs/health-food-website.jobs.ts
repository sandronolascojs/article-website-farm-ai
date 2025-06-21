import { logger } from '@/utils/logger.instance';
import { AsyncTask, CronJob } from 'toad-scheduler';
import { addGenerateArticleJob } from '@/qeue/articleQueue';

const AMOUNT_OF_ARTICLES_TO_GENERATE = 15;
export const generateHealthFoodArticlesJob = new CronJob(
  {
    cronExpression: '0 */12 * * *', // every 12 hours
  },
  new AsyncTask('generate-health-food-articles', async () => {
    logger.info('Enqueuing health food article generation job');
    await addGenerateArticleJob({ amount: AMOUNT_OF_ARTICLES_TO_GENERATE });
    logger.info('Health food article generation job enqueued');
  }),
);

export const healthFoodWebsiteJobs = [generateHealthFoodArticlesJob];
