import fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './src/config/env.config';
import { dbManager, defaultConfigs } from '@auto-articles/db';
import { initServer } from '@ts-rest/fastify';
import { articlesRouter } from '@/controllers/articles.controller';
import { categoriesRouter } from '@/controllers/categories.controller';
import { errorHandlerPlugin } from '@/plugins/errorHandler.plugin';
import { requestHandlerPlugin } from '@/plugins/requestHandler.plugin';
import { logger } from '@/utils/logger.instance';

const server = fastify();
const tsRestServer = initServer();

server.register(cors, {
  origin: env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()),
  credentials: true,
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type'],
  maxAge: 600,
});

server.get('/health', () => {
  return {
    status: 'ok',
  };
});

server.ready().then(async () => {
  await dbManager.initialize(defaultConfigs);
});

server.register(async (instance) => {
  await requestHandlerPlugin(instance, { logger });
  await errorHandlerPlugin(instance, { logger });

  instance.register(tsRestServer.plugin(articlesRouter));
  instance.register(tsRestServer.plugin(categoriesRouter));
});

server.listen({ port: env.PORT }, (err) => {
  console.log('Server is running on port', env.PORT);
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
