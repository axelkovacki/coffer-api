import DataModel from '../models/DataModel';
import ProjectModel from '../../project/models/ProjectModel';
import Cryptography from '../../../config/cryptography/Cryptography';

class DataController {
    async list(request: any, reply: any) {
        try {
            const { project_id } = request.headers;

            if (!project_id) {
                return reply.code('400').send({ message: 'Invalid Param' });
            }

            const cryptography = new Cryptography(project_id);
            let data: any = await DataModel.find({ projectId: project_id }).sort('-createdAt');

            if (data.length) {
                data = data.map((i) => {
                    i.payload = cryptography.decript(data.payload);
                    return i;
                });
            }

            return reply.send({ data });
        } catch (err) {
            console.log(err);
        }
    }

    async get(request: any, reply: any) {
        try {
            const { project_id } = request.headers;
            const { token } = request.query;

            if (!project_id || !token) {
                return reply.code('400').send({ message: 'Invalid Param' });
            }

            const cryptography = new Cryptography(project_id);
            let data: any = await DataModel.findOne({ projectId: project_id, _id: token });

            data.payload = cryptography.decript(data.payload);

            return reply.send({ data });
        } catch (err) {
            console.log(err);
        }
    }

    async create(request: any, reply: any) {
        try {
            const { _id } = request.auth;
            const { project_id } = request.headers;
            const { payload } = request.body;

            if (!project_id || !payload) {
                return reply.code('400').send({ message: 'Invalid Body' });
            }

            const projectExists = await ProjectModel.findOne({ userId: _id, _id: project_id });

            if (!projectExists) {
                return reply.code('404').send({ message: 'Project not found' });
            }

            const cryptography = new Cryptography(project_id);

            const data = await DataModel.create({
                projectId: project_id,
                payload: cryptography.encrypt(payload)
            });

            return reply.send({ message: 'Data Created', data: { token: data._id } });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: 'Error has occurred', data: err.message });
        }
    }
}

export default new DataController();
