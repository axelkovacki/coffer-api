const LogModel = global.locator('modules/log/models/log')
const ProjectModel = global.locator('modules/project/models/project')

async function create(request, reply) {
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

    const data = await LogModel.create({
      projectId: project_id,
      payload
    });

    return reply.send({ message: 'Log Created', data });
  } catch (err) {
    console.log(err);
    return reply.code('400').send({ message: 'Error has occurred', data: err.message });
  }
}

async function list(request, reply) {
  try {
    const { project_id } = request.headers;
  
    if (!project_id) {
      return reply.code('400').send({ message: 'Invalid Param' });
    }
  
    return reply.send({ data: await LogModel.find({ projectId: project_id }).sort('-createdAt') });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create,
  list
}
