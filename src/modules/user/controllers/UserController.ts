import UserService from '../services/UserService';

class UserController {
    async login(request: any, reply: any) {
        try {
            const { email, password } = request.body;
            const user = await UserService.login(email, password);

            return reply.send({ data: user });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: err.message });
        }
    }

    async create(request: any, reply: any) {
        try {
            const { name, email, password } = request.body;
            const newUser = await UserService.create(
                name,
                email,
                password
            );

            return reply.send({ data: newUser });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: err.message });
        }
    }

    async remove(request: any, reply: any) {
        try {
            const { _id } = request.auth;
            await UserService.remove(_id);

            return reply.send({ message: 'Project deleted.' });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: err.message });
        }
    }
}

export default new UserController();
