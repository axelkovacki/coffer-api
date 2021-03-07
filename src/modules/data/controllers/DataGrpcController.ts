import DataService from '../services/DataService';

class DataGrpcController {
    async list(call: any, callback: any) {
        try {
            console.log(call.request)
            const projectId = call.request.projectId;
            const data = await DataService.list(projectId);
            
            callback(null, { count: data.length, data });
        } catch (err) {
            console.log(err);
            return { message: err.message };
        }
    }

    async get(projectId: string, tokens: string[]) {
        try {
            const data = await DataService.get(projectId, tokens);

            return { data };
        } catch (err) {
            console.log(err);
            return { message: err.message };
        }
    }

    async create(projectId: string, payload: object[]) {
        try {
            const data = await DataService.create(projectId, payload);

            return { message: 'Data Created', data };
        } catch (err) {
            console.log(err);
            return { message: err.message };
        }
    }
}

export default new DataGrpcController();
