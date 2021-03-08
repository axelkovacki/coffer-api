import UserModel from '../../../modules/user/models/UserModel';

class AuthService {
    async handle(apiKey: string) {
        const user = await UserModel.findOne({ apiKey });

        if (!user) {
            throw new Error('No user found');
        }

        return user;
    }
}

export default new AuthService();
