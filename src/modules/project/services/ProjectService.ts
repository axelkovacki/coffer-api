import ProjectModel from '../models/ProjectModel';

class ProjectService {
    async list(userId: string) {
        const projects: any = await ProjectModel.find({ userId });

        if (!projects) {
            return [];
        }

        let parsed = [];
        for (let index = 0; index < projects.length; index++) {
            parsed.push({
                projectId: projects[index]._id,
                name: projects[index].name
            });
        }

        return parsed;
    }

    async create(userId: string, name: string) {
        const projectExists = await ProjectModel.findOne({ name });

        if (projectExists) {
            throw new Error('Project with this name already exists');
        }

        const project: any = await ProjectModel.create({
            userId: userId,
            name
        });

        return { projectId: project._id, name: project.name };
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
