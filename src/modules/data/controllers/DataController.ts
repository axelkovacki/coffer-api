import AuthService from '../../auth/services/AuthService';
import DataService from '../services/DataService';

class DataController {
    async list(call: any, callback: any) {
        try {
            const { apiKey, projectId, schema } = call.request;

            if (!apiKey) {
                throw new Error('Api Key id not reported');
            }

            if (!projectId) {
                throw new Error('Project id not reported');
            }

            if (!schema || !schema.length) {
                throw new Error('Schema not reported or not valid');
            }

            const { _id: userId } = await AuthService.handle(apiKey);
            const data = await DataService.list(userId, projectId, schema);

            return callback(null, { data });
        } catch (err) {
            return callback(err);
        }
    }

    async get(call: any, callback: any) {
        try {
            const { apiKey, projectId, schema, _ids } = call.request;

            if (!apiKey) {
                throw new Error('Api Key id not reported');
            }

            if (!projectId) {
                throw new Error('Project id not reported');
            }

            if (!schema || !schema.length) {
                throw new Error('Schema not reported or not valid');
            }

            if (!_ids || !_ids.length) {
                throw new Error('Ids not reported');
            }

            const { _id: userId } = await AuthService.handle(apiKey);
            const result = await DataService.get(userId, projectId, schema, _ids);
            const data = result.map((r) => JSON.stringify(r));

            return callback(null, { data });
        } catch (err) {
            console.log(err)
            return callback(err);
        }
    }

    async create(call: any, callback: any) {
        try {
            const { apiKey, projectId, schema, payload } = call.request;

            if (!apiKey) {
                throw new Error('Api Key id not reported');
            }

            if (!projectId) {
                throw new Error('Project id not reported');
            }

            if (!schema || !schema.length) {
                throw new Error('Schema not reported or not valid');
            }

            if (!payload || !payload.length) {
                throw new Error('Payload not reported or not valid');
            }

            const { _id: userId } = await AuthService.handle(apiKey);
            const data = await DataService.create(
                userId,
                projectId,
                schema,
                payload.map((p: string) => JSON.parse(p))
            );

            return callback(null, { message: 'Data Created', data });
        } catch (err) {
            return callback(err);
        }
    }
}

export default new DataController();
