import Dotenv from 'dotenv';
import ServerRest from './config/server/rest/Server';
import ServerGrpc from './config/server/grpc/Server';
import Database from './config/database/Database';

Dotenv.config();

try {
    const serverRestConnection = new ServerRest();
    serverRestConnection.start();

    const serverGrpcConnection = new ServerGrpc();
    serverGrpcConnection.start();

    const databaseConnection = new Database();
    databaseConnection.start();
} catch (err) {
    console.log(err);
}

