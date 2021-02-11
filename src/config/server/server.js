const Fastify = require('fastify')({ logger: true });

const ServerRoutes = global.locator('config/server/routes');

async function start() {
  try {
    Fastify.register(require('fastify-cors'));
    Fastify.register(ServerRoutes);
    await Fastify.listen(3001);
    Fastify.log.info(`server listening on ${Fastify.server.address().port}`);
  } catch (err) {
    Fastify.log.error(err);
    process.exit(1);
  }
}

module.exports = {
  start
};
