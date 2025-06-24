import { logger } from '@/utils/logger.instance';
import type { FastifyPluginAsync } from 'fastify';

export const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler(async (error, request) => {
    logger.error(error.message, {
      path: request.url,
      statusCode: error.statusCode,
      error: error.message,
      requestId: request.id,
      ip: request.ip,
    });
  });
};
