import md5 from 'md5';
import UserModel from '../models/UserModel';

class UserController {
    async login(request: any, reply: any) {
        try {
            const { email, password } = request.body;

            const user = await UserModel.findOne({ email, password: md5(password) });

            if (!user) {
                return reply.code(404).send({ message: 'No user' });
            }

            return reply.send(user);
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: 'Error has occurred', data: err.message });
        }
    }

    async create(request: any, reply: any) {
        try {
            const { name, email, password } = request.body;

            const userExists = await UserModel.findOne({ email });

            if (userExists) {
                return reply.code(409).send({ message: 'User already exists.' });
            }

            const apiKey = md5(`${name}-${email}-${password}`);

            const newUser = await UserModel.create({
                name,
                email,
                password: md5(password),
                apiKey
            });

            return reply.send({ data: newUser });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: 'Error has occurred', data: err.message });
        }
    }

    async remove(request: any, reply: any) {
        try {
            const { _id } = request.auth;
            const { project_id } = request.headers;
            const { payload } = request.body;

            const { email, password } = request.body;

            const user = await UserModel.findOne({ email, password: md5(password) });

            if (!user) {
                return reply.code(404).send({ message: 'No user' });
            }

            return reply.send(user);
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: 'Error has occurred', data: err.message });
        }
    }
}

export default new UserController();
