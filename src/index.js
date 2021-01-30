require('dotenv').config();
const database = require('./config/database');
const server = require('./config/server');

function start() {
  try {
    database.start();
    server.start();
  } catch (err) {
    console.log(err);
  }
}

start();