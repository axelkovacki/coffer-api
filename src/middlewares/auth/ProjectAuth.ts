import AbstractMiddleware from '../AbstractMiddleware';
import ProjectModel from '../../modules/project/models/ProjectModel';

class ProjectAuth extends AbstractMiddleware {
    async handler(request: any, reply: any) {
        const { project_id } = request.headers;

        if (!project_id) {
            return reply.code(400).send({ message: 'Project id not reported' });
        }

        const project = await ProjectModel.findOne({ _id: project_id });

        if (!project) {
            return reply.code(404).send({ message: 'No project found' });
        }
    }
}

export default new ProjectAuth();
