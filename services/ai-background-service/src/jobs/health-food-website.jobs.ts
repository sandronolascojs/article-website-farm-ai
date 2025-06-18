import { GenerateHealthContentService } from '@/services/healthContent.service';
import { logger } from '@/utils/logger.instance';
import { mastraInstance } from '@/utils/mastra.instance';
import { HealthFoodArticleGeneratorAgent } from '@auto-articles/ai/src/mastra';
import { AsyncTask, CronJob } from 'toad-scheduler';

export const generateHealthFoodArticlesJob = new CronJob(
  {
    cronExpression: '0 * * * *',
  },
  new AsyncTask('generate-health-food-articles', async () => {
    const agent = new HealthFoodArticleGeneratorAgent({ mastra: mastraInstance });
    const healthContentService = new GenerateHealthContentService(logger, agent);

    for (let i = 0; i < 30; i++) {
      await healthContentService.generateHealthArticle();
    }
  }),
);

export const healthFoodWebsiteJobs = [generateHealthFoodArticlesJob];
