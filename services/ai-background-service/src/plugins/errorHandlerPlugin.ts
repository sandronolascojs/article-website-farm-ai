import { logger } from '@/utils/logger.instance';
import type { FastifyPluginAsync } from 'fastify';

export const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler(async (error, request) => {
export const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler(async (error, request, reply) => {
    logger.error(error.message, {
      path: request.url,
      statusCode: error.statusCode,
      requestId: request.id,
      ip: request.ip,
    });

    // Send error response
    reply.status(error.statusCode || 500).send({
      error: 'Internal Server Error',
      message: error.statusCode ? error.message : 'Something went wrong'
    });
  });
};
  });
};
