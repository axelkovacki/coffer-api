import AuthService from '../../auth/services/AuthService';
import DataService from '../services/DataService';

class DataController {
    async list(call: any, callback: any) {
        try {
            const { apiKey, projectId } = call.request;
            const { _id: userId } = await AuthService.handle(apiKey);

            const data = await DataService.list(userId, projectId);

            return callback(null, { data });
        } catch (err) {
            return callback(err);
        }
    }

    async get(call: any, callback: any) {
        try {
            const { apiKey, projectId, tokens } = call.request;
            const { _id: userId } = await AuthService.handle(apiKey);

            const data = await DataService.get(userId, projectId, tokens);

            return callback(null, { data });
        } catch (err) {
            return callback(err);
        }
    }

    async create(call: any, callback: any) {
        try {
            const { apiKey, projectId, payload } = call.request;
            const { _id: userId } = await AuthService.handle(apiKey);

            const data = await DataService.create(userId, projectId, payload);

            return callback(null, { message: 'Data Created', data });
        } catch (err) {
            return callback(err);
        }
    }
}

export default new DataController();
