import ProjectModel from '../models/ProjectModel';

class ProjectController {
    async list(request: any, reply: any) {
        const { _id } = request.auth;
        const projects = await ProjectModel.find({ userId: _id });

        if (!projects) {
            return reply.send({ data: [] });
        }

        return reply.send({ data: projects });
    }

    async create(request: any, reply: any) {
        const { _id } = request.auth;
        const { name } = request.body;

        const projectExists = await ProjectModel.findOne({ name });

        if (projectExists) {
            return reply.code(409).send({ message: 'Project with this name already exists.' });
        }

        const newProject = await ProjectModel.create({
            userId: _id,
            name
        });

        return reply.send({ data: newProject });
    }

    async remove(request: any, reply: any) {
        const { project_id } = request.headers;

        const project = await ProjectModel.findOne({ _id: project_id });

        if (!project) {
            return reply.code(404).send({ message: 'Project not exists.' });
        }

        project.remove();

        return reply.send({ message: 'Project deleted.' });
    }
}

export default new ProjectController();
