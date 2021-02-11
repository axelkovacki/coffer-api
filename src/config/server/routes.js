const AuthMiddleware = global.locator('middlewares/auth/auth');
const UserController = global.locator('modules/user/controllers/user');
const ProjectController = global.locator('modules/project/controllers/project');
const LogController = global.locator('modules/log/controllers/log');

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
