import { Worker } from 'bullmq';
import { ARTICLE_QUEUE_NAME, GenerateArticleJobData } from './articleQueue';
import { GenerateHealthContentService } from '../services/healthContent.service';
import { mastraInstance } from '../utils/mastra.instance';
import { HealthFoodArticleGeneratorAgent } from '@auto-articles/ai/src/mastra';
import { logger } from '../utils/logger.instance';
import { env } from '@/config/env.config';

export const startArticleWorker = () => {
  return new Worker<GenerateArticleJobData>(
    ARTICLE_QUEUE_NAME,
    async (job) => {
      const agent = new HealthFoodArticleGeneratorAgent({
        mastra: mastraInstance,
      });
      const healthContentService = new GenerateHealthContentService(logger, agent);
      logger.info(`Processing job ${job.id} to generate ${job.data.amount} health articles`);
      await healthContentService.generateHealthArticle(job.data.amount);
      logger.info(`Completed job ${job.id} for health article generation`);
    },
    {
      connection: {
        url: env.REDIS_URL,
      },
    },
  );
};
