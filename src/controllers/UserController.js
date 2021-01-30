const md5 = require('md5');
const User = require('../models/User');

async function login(request, reply) {

  const { email, password } = request.body;

  const user = await User.findOne({ email, password: md5(password) });
  console.log(user)
  if(!user) {
    return reply.code(404).send({ message: 'No user'});
  }

  return reply.send(user);
}

async function create(request, reply) {  
  const { name, email, password } = request.body;

  const userExists = await User.findOne({ email });

  if(userExists) {
    return reply.code(409).send({ message: 'User already exists.' });
  }

  const apiKey = md5(`${name}-${email}-${password}`);

  const newUser = await User.create({
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