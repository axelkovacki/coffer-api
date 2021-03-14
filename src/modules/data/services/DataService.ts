import DataSchemaService from './DataSchemaService';
import DataModel from '../models/DataModel';

class DataService {
    async list(userId: string, projectId: string, schema: string[]) {
        let result: any = await DataModel.find({ userId, projectId }).sort('-createdAt');
        if (!result.length) {
            return [];
        }

        const schemaService = new DataSchemaService(
            userId,
            projectId,
            schema,
            result
        );

        const data = schemaService.undigest();

        return data;
    }

    async get(userId: string, projectId: string, schema: string[], _ids: string[]) {
        let result: any = await DataModel.find({ userId, projectId, _id: { $in: _ids } });
        if (!result.length) {
            return [];
        }

        const schemaService = new DataSchemaService(
            userId,
            projectId,
            schema,
            result
        );

        const data = schemaService.undigest();

        return data;
    }

    async create(userId: string, projectId: string, schema: string[], payload: object[]) {
        const schemaService = new DataSchemaService(
            userId,
            projectId,
            schema,
            payload
        );

        const data = schemaService.digest();
        const result = await DataModel.insertMany(data);

        return result;
    }
}

export default new DataService();
