const User = require('../models/User');

async function verify(request, reply) {
  const { api_key } = request.headers;

  if(!api_key) {
    return reply.code(400).send({ message: 'Api key not reported'});
  }

  const user = await User.findOne({ apiKey: api_key });

  if(!user) {
    return reply.code(404).send({ message: 'No user found'});
  }

  request.auth = user;
}

module.exports = verify;