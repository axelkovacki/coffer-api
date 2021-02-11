const md5 = require('md5');

const UserModel = global.locator('modules/user/models/user')

async function login(request, reply) {

  const { email, password } = request.body;

  const user = await UserModel.findOne({ email, password: md5(password) });
  
  if(!user) {
    return reply.code(404).send({ message: 'No user'});
  }

  return reply.send(user);
}

async function create(request, reply) {  
  const { name, email, password } = request.body;

  const userExists = await UserModel.findOne({ email });

  if(userExists) {
    return reply.code(409).send({ message: 'User already exists.' });
  }

  const apiKey = md5(`${name}-${email}-${password}`);

  const newUser = await UserModel.create({
    name,
    email,
    password: md5(password),
    apiKey
  });

  return reply.send({ data: newUser });
}

module.exports = {
  login,
  create
}