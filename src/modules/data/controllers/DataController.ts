import DataService from '../services/DataService';

class DataController {
    async list(call: any, callback: any) {
        try {
            const { projectId } = call.request;
            const data = await DataService.list(projectId);
    
            return callback(null, { count: data.length, data });
        } catch (err) {
            return callback(err);
        }
    }

    async get(call: any, callback: any) {
        try {
            const { projectId, tokens } = call.request;
            const data = await DataService.get(projectId, tokens);
    
            return callback(null, { data });
        } catch (err) {
            return callback(err);
        }
    }

    async create(call: any, callback: any) {
        try {
            const { projectId, payload } = call.request;
            const data = await DataService.create(projectId, payload);
    
            return callback(null, { message: 'Data Created', data });
        } catch (err) {
            return callback(err);
        }
    }
}

export default new DataController();
