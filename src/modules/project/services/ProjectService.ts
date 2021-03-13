import ProjectModel from '../models/ProjectModel';
import DataModel from '../../data/models/DataModel';

class ProjectService {
    async list(userId: string) {
        const result: any = await ProjectModel.find({ userId });

        if (!result) {
            return [];
        }

        const projects = result.map((r: any) => ({
            projectId: r._id,
            name: r.name
        }));

        return projects;
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

    async remove(userId: string, projectId: string) {
        const project = await ProjectModel.findOne({ userId, _id: projectId });

        if (!project) {
            throw new Error('Project not exists');
        }

        await DataModel.deleteMany({ projectId });
        return project.remove();
    }
}

export default new ProjectService();
