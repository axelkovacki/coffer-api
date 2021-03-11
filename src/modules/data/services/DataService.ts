import DataModel from '../models/DataModel';
import Cryptography from '../../../config/cryptography/Cryptography';

class DataService {
    async list(userId: string, projectId: string) {
        let data: any = await DataModel.find({ userId, projectId }).sort('-createdAt');
        if (!data.length) {
            return [];
        }

        const cryptography = new Cryptography(projectId);

        let parsed = [];
        for (let index = 0; index < data.length; index++) {
            parsed.push({
                token: data[index]._id,
                payload: cryptography.decript(data[index].payload)
            });
        }

        return parsed;
    }

    async get(userId: string, projectId: string, ids: string[]) {
        if (!ids || !ids.length) {
            throw new Error('Ids not reported');
        }

        let data: any = await DataModel.find({ userId, projectId, _id: { $in: ids } });
        if (!data.length) {
            return [];
        }

        const cryptography = new Cryptography(projectId);

        let parsed = [];
        for (let index = 0; index < data.length; index++) {
            parsed.push({
                token: data[index]._id,
                payload: cryptography.decript(data[index].payload)
            });
        }

        return parsed;
    }

    async create(userId: string, projectId: string, payload: string) {
        if (!payload) {
            throw new Error('Payload not reported')
        }

        const cryptography = new Cryptography(projectId);
        const data = await DataModel.create({
            userId,
            projectId,
            payload: cryptography.encrypt(payload)
        });

        return { token: data._id };
    }
}

export default new DataService();
