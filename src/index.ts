import Dotenv from 'dotenv';
import Server from './config/server/Server';
import Database from './config/database/Database';

Dotenv.config();

try {
    const serverConnection = new Server();
    serverConnection.start();

    const databaseConnection = new Database();
    databaseConnection.start();
} catch (err) {
    console.log(err);
}

