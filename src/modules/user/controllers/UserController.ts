import UserService from '../services/UserService';

class UserController {
    async login(call: any, callback: any) {
        try {
            const { email, password } = call.request;

            if (!email) {
                throw new Error('E-mail not reported');
            }

            if (!password) {
                throw new Error('Password not reported');
            }

            const user = await UserService.login(email, password);

            return callback(null, { data: user });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }

    async create(call: any, callback: any) {
        try {
            const { name, email, password } = call.request;

            if (!name) {
                throw new Error('Name not reported');
            }

            if (!email) {
                throw new Error('E-mail not reported');
            }

            if (!password) {
                throw new Error('Password not reported');
            }

            const newUser = await UserService.create(
                name,
                email,
                password
            );

            return callback(null, { data: newUser });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }

    async remove(call: any, callback: any) {
        try {
            const { _id } = call.request;

            if (!_id) {
                throw new Error('Id not reported');
            }

            await UserService.remove(_id);

            return callback(null, { message: 'Project deleted.' });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }
}

export default new UserController();
