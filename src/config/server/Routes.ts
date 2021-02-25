import AuthMiddleware from '../../middlewares/auth/Auth';
import ProjectAuthMiddleware from '../../middlewares/auth/ProjectAuth';
import UserController from '../../modules/user/controllers/UserController';
import ProjectController from '../../modules/project/controllers/ProjectController';
import DataController from '../../modules/data/controllers/DataController';

class Routes {
    handler(fastify: any, opts: any, next: any) {
        fastify.post('/user/login', async (request: any, reply: any) => UserController.login(request, reply));
        fastify.post('/user/create', async (request: any, reply: any) => UserController.create(request, reply));

        fastify.post(
            '/user/remove',
            { preHandler: [AuthMiddleware.handler] },
            async (request: any, reply: any) => UserController.remove(request, reply)
        );

        fastify.post(
            '/project/create',
            { preHandler: [AuthMiddleware.handler] },
            async (request: any, reply: any) => ProjectController.create(request, reply)
        );

        fastify.delete(
            '/project/remove',
            { preHandler: [AuthMiddleware.handler, ProjectAuthMiddleware.handler] },
            async (request: any, reply: any) => ProjectController.remove(request, reply)
        );

        fastify.get(
            '/project/list',
            { preHandler: [AuthMiddleware.handler] },
            async (request: any, reply: any) => ProjectController.list(request, reply)
        );

        fastify.post(
            '/data/create',
            { preHandler: [AuthMiddleware.handler, ProjectAuthMiddleware.handler] },
            async (request: any, reply: any) => DataController.create(request, reply)
        );

        fastify.get(
            '/data/list',
            { preHandler: [AuthMiddleware.handler, ProjectAuthMiddleware.handler] },
            async (request: any, reply: any) => DataController.list(request, reply)
        );

        fastify.get(
            '/data/get',
            { preHandler: [AuthMiddleware.handler, ProjectAuthMiddleware.handler] },
            async (request: any, reply: any) => DataController.get(request, reply)
        );

        next();
    }
}

export default new Routes();