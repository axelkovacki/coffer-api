import md5 from 'md5';
import UserModel from '../models/UserModel';

class UserService {
    async login(email: any, password: any) {
        const user = await UserModel.findOne({ email, password: md5(password) });

        if (!user) {
            throw new Error('No user found');
        }

        return user;
    }

    async create(name: string, email: string, password: string) {
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            throw new Error('User already exists');
        }

        const apiKey = md5(`${name}-${email}-${password}`);
        const newUser = await UserModel.create({
            name,
            email,
            password: md5(password),
            apiKey
        });

        return newUser;
    }

    async remove(userId: string) {
        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            throw new Error('No user found');
        }

        return user.remove();
    }
}

export default new UserService();
