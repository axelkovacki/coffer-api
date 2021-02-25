import DataService from '../services/DataService';

class DataController {
    async list(request: any, reply: any) {
        try {
            const { project_id } = request.headers;
            const data = await DataService.list(project_id);

            return reply.send({ count: data.length, data });
        } catch (err) {
            console.log(err);
            return reply.code('500').send({ message: err.message });
        }
    }

    async get(request: any, reply: any) {
        try {
            const { project_id } = request.headers;
            const { tokens } = request.query;

            const ids = JSON.parse(tokens);
            const data = await DataService.get(project_id, ids);

            return reply.send({ data });
        } catch (err) {
            console.log(err);
            return reply.code('500').send({ message: err.message });
        }
    }

    async create(request: any, reply: any) {
        try {
            const { project_id } = request.headers;
            const { payload } = request.body;

            const data = await DataService.create(project_id, payload);

            return reply.send({ message: 'Data Created', data });
        } catch (err) {
            console.log(err);
            return reply.code('500').send({ message: err.message });
        }
    }
}

export default new DataController();
