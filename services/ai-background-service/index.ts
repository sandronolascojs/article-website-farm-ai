import fastify from 'fastify';
import { fastifySchedule } from '@fastify/schedule';
import { env } from './src/config/env.config';
import { healthFoodWebsiteJobs } from '@/jobs/health-food-website.jobs';
import { dbManager, defaultConfigs } from '@auto-articles/db';
import { startArticleWorker } from './src/qeue/articleWorker';
import { errorHandlerPlugin } from '@/plugins/errorHandlerPlugin';

const server = fastify();
server.register(fastifySchedule);

server.register(errorHandlerPlugin);

server.ready().then(async () => {
  await dbManager.initialize(defaultConfigs);
  healthFoodWebsiteJobs.forEach((job) => server.scheduler.addCronJob(job));
  startArticleWorker();
});

server.get('/health', () => {
  return {
    status: 'ok',
  };
});

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});

server.listen({ port: env.PORT }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
