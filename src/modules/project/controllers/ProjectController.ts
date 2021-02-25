import ProjectService from '../services/ProjectService';

class ProjectController {
    async list(request: any, reply: any) {
        try {
            const { _id } = request.auth;
            const projects = await ProjectService.list(_id);
    
            return reply.send({ data: projects });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: err.message });
        }
    }

    async create(request: any, reply: any) {
        try {
            const { _id } = request.auth;
            const { name } = request.body;
    
            const newProject = await ProjectService.create(_id, name);
    
            return reply.send({ data: newProject });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: err.message });
        }
    }

    async remove(request: any, reply: any) {
        try {
            const { project_id } = request.headers;
    
            await ProjectService.remove(project_id);
    
            return reply.send({ message: 'Project deleted.' });
        } catch (err) {
            console.log(err);
            return reply.code('400').send({ message: err.message });
        }
    }
}

export default new ProjectController();
