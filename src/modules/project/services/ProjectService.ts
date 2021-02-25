import ProjectModel from '../models/ProjectModel';

class ProjectService {
    async list(userId: string) {
        const projects = await ProjectModel.find({ userId });

        if (!projects) {
            return [];
        }

        return projects;
    }

    async create(userId: string, name: string) {
        const projectExists = await ProjectModel.findOne({ name });

        if (projectExists) {
            throw new Error('Project with this name already exists');
        }

        const newProject = await ProjectModel.create({
            userId: userId,
            name
        });

        return newProject;
    }

    async remove(projectId: string) {
        const project = await ProjectModel.findOne({ _id: projectId });

        if (!project) {
            throw new Error('Project not exists');
        }

        return project.remove();
    }
}

export default new ProjectService();
