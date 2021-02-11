require('dotenv').config();
global.locator = require('./config/locator');

const Server = global.locator('config/server/server');
const DatabaseConnection = global.locator('config/database/connection');

function start() {
  try {
    Server.start();
    DatabaseConnection.start();
  } catch (err) {
    console.log(err);
  }
}

start();
