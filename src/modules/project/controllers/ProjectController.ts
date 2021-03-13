import AuthService from '../../auth/services/AuthService';
import ProjectService from '../services/ProjectService';

class ProjectController {
    async list(call: any, callback: any) {
        try {
            const { apiKey } = call.request;

            if (!apiKey) {
                throw new Error('Api Key id not reported');
            }

            const { _id: userId } = await AuthService.handle(apiKey);
            const projects = await ProjectService.list(userId);

            return callback(null, { data: projects });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }

    async create(call: any, callback: any) {
        try {
            const { apiKey, name } = call.request;

            if (!apiKey) {
                throw new Error('Api Key id not reported');
            }

            const { _id: userId } = await AuthService.handle(apiKey);
            const newProject = await ProjectService.create(userId, name);

            return callback(null, { data: newProject });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }

    async remove(call: any, callback: any) {
        try {
            const { apiKey, projectId } = call.request;

            if (!apiKey) {
                throw new Error('Api Key id not reported');
            }

            if (!projectId) {
                throw new Error('Project id not reported');
            }

            const { _id: userId } = await AuthService.handle(apiKey);
            await ProjectService.remove(userId, projectId);

            return callback(null, { message: 'Project deleted.' });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }
}

export default new ProjectController();
