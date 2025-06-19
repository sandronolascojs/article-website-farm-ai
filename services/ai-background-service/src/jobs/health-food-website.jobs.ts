import { GenerateHealthContentService } from '@/services/healthContent.service';
import { logger } from '@/utils/logger.instance';
import { mastraInstance } from '@/utils/mastra.instance';
import { HealthFoodArticleGeneratorAgent } from '@auto-articles/ai/src/mastra';
import { AsyncTask, CronJob } from 'toad-scheduler';

export const generateHealthFoodArticlesJob = new CronJob(
  {
    cronExpression: '0 */12 * * *',
  },
  new AsyncTask('generate-health-food-articles', async () => {
    logger.info('Generating health food articles');
    const agent = new HealthFoodArticleGeneratorAgent({ mastra: mastraInstance });
    const healthContentService = new GenerateHealthContentService(logger, agent);

    await healthContentService.generateHealthArticle(10);

    logger.info('Health food articles generated');
  }),
);

export const healthFoodWebsiteJobs = [generateHealthFoodArticlesJob];
