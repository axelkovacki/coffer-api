import DataModel from '../models/DataModel';
import Cryptography from '../../../config/cryptography/Cryptography';

class DataService {
    async list(projectId: string) {
        let data: any = await DataModel.find({ projectId }).sort('-createdAt');
        if (!data.length) {
            return [];
        }

        const cryptography = new Cryptography(projectId);
        data = data.map((i: any) => {
            i.payload = cryptography.decript(i.payload);
            return i;
        });

        return data;
    }

    async get(projectId: string, ids: string[]) {
        if (!ids || !ids.length) {
            throw new Error('Ids not reported');
        }

        let data: any = await DataModel.find({ projectId, _id: { $in: ids } });
        if (!data.length) {
            return [];
        }

        const cryptography = new Cryptography(projectId);
        data = data.map((i: any) => {
            i.payload = cryptography.decript(i.payload);
            return i;
        });
    
        return data;
    }

    async create(projectId: string, payload: object) {
        if (!payload) {
            throw new Error('Payload not reported')
        }

        const cryptography = new Cryptography(projectId);
        const data = await DataModel.create({
            projectId: projectId,
            payload: cryptography.encrypt(payload)
        });

        return { token: data._id };
    }
}

export default new DataService();
