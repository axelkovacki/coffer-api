const Project = require('../models/Project');

async function list(request, reply) {
  const { _id } = request.auth;
  const projects = await Project.find({ userId: _id });
  
  if(!projects) {
    return reply.send({ data: [] });
  }

  return reply.send({ data: projects });
}

async function create(request, reply) {  
  const { _id } = request.auth;
  const { name } = request.body;

  const projectExists = await Project.findOne({ name });

  if(projectExists) {
    return reply.code(409).send({ message: 'Project with this name already exists.' });
  }

  const newProject = await Project.create({
    userId: _id,
    name
  });
  
  return reply.send({ data: newProject });
}

module.exports = {
  list,
  create
}