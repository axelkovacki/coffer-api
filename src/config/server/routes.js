const AuthMiddleware = require('../../middlewares/AuthMiddleware');

const UserController = require('../../controllers/UserController');
const ProjectController = require('../../controllers/ProjectController');
const LogController = require('../../controllers/LogController');

module.exports = function (fastify, opts, next) {
  fastify.post('/user/login', async (request, reply) => UserController.login(request, reply));
  fastify.post('/user/create', async (request, reply) => UserController.create(request, reply));

  fastify.post(
    '/project/create',
    { preHandler: [AuthMiddleware] },
    async (request, reply) => ProjectController.create(request, reply)
  );
  fastify.get(
    '/project/list',
    { preHandler: [AuthMiddleware] },
    async (request, reply) => ProjectController.list(request, reply)
  );

  fastify.post(
    '/log/create',
    { preHandler: [AuthMiddleware] },
    async (request, reply) => LogController.create(request, reply)
  );
  fastify.get(
    '/log/list',
    { preHandler: [AuthMiddleware] },
    async (request, reply) => LogController.list(request, reply)
  );

  next();
}