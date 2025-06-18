import fastify from "fastify";
import { fastifySchedule } from "@fastify/schedule";
import { env } from "./src/config/env.config";

const server = fastify();
server.register(fastifySchedule);


server.get('/health', () => {
  return {
    status: 'ok',
  };
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  await server.close();
  process.exit(0);
});

server.listen({ port: env.PORT }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on port ${env.PORT}`);
});