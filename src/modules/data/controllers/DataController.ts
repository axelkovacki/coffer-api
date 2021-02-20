import DataModel from '../models/DataModel';
import ProjectModel from '../../project/models/ProjectModel';

class DataController {
    async list(request: any, reply: any) {
        try {
            const { project_id } = request.headers;

            if (!project_id) {
                return reply.code('400').send({ message: 'Invalid Param' });
            }

            return reply.send({ data: await DataModel.find({ projectId: project_id }).sort('-createdAt') });
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

            const data = await DataModel.create({
                projectId: project_id,
                payload
            });

            return reply.send({ message: 'Data Created', data });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: 'Error has occurred', data: err.message });
        }
    }
}

export default new DataController();
