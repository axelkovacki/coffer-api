import AuthService from '../../auth/services/AuthService';
import DataService from '../services/DataService';

class DataController {
    async list(call: any, callback: any) {
        try {
            const { apiKey, projectId } = call.request;
            await AuthService.handle(apiKey);

            const data = await DataService.list(projectId);

            return callback(null, { count: data.length, data });
        } catch (err) {
            return callback(err);
        }
    }

    async get(call: any, callback: any) {
        try {
            const { apiKey, projectId, tokens } = call.request;
            await AuthService.handle(apiKey);

            const data = await DataService.get(projectId, tokens);
    
            return callback(null, { data });
        } catch (err) {
            return callback(err);
        }
    }

    async create(call: any, callback: any) {
        try {
            const { apiKey, projectId, payload } = call.request;
            await AuthService.handle(apiKey);

            const data = await DataService.create(projectId, payload);
    
            return callback(null, { message: 'Data Created', data });
        } catch (err) {
            return callback(err);
        }
    }
}

export default new DataController();
