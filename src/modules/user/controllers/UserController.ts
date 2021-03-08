import UserService from '../services/UserService';

class UserController {
    async login(call: any, callback: any) {
        try {
            const { email, password } = call.request;
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
            await UserService.remove(_id);

            return callback(null, { message: 'Project deleted.' });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }
}

export default new UserController();
