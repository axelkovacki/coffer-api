import AuthService from '../../auth/services/AuthService';
import ProjectService from '../services/ProjectService';

class ProjectController {
    async list(call: any, callback: any) {
        try {
            const { apiKey } = call.request;
            const { _id } = await AuthService.handle(apiKey);
            const projects = await ProjectService.list(_id);
    
            return callback(null, { data: projects });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }

    async create(call: any, callback: any) {
        try {
            const { apiKey, name } = call.request;
            const { _id } = await AuthService.handle(apiKey);
            const newProject = await ProjectService.create(_id, name);

            return callback(null, { data: newProject });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }

    async remove(call: any, callback: any) {
        try {
            const { projectId } = call.request;
            await ProjectService.remove(projectId);
    
            return callback(null, { message: 'Project deleted.' });
        } catch (err) {
            console.log(err);
            return callback(err);
        }
    }
}

export default new ProjectController();
