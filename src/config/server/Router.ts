import path from 'path';
import { Server, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

import UserController from '../../modules/user/controllers/UserController';
import ProjectController from '../../modules/project/controllers/ProjectController';
import DataController from '../../modules/data/controllers/DataController';

export default class Router {
    connection: Server;
    protoOptions: object;

    constructor(connection: Server) {
        this.connection = connection;
        this.protoOptions = {
            keepCase: true,
            longs: String,
            enums: String,
            arrays: true
        };
    }

    private buildContract(contract: string) {
        const contractPath = path.resolve(__dirname, `../../contracts/${contract}.proto`);
        const packageDefinition = loadSync(contractPath, this.protoOptions);
        const proto = loadPackageDefinition(packageDefinition);

        return proto;
    }

    private exposeUserRoutes() {
        const contract = this.buildContract('user');
        const { login: Login, create: Create, remove: Remove } = UserController;

        this.connection.addService(contract.User.service, {
            Login,
            Create,
            Remove
        });
    }

    private exposeProjectRoutes() {
        const contract = this.buildContract('project');
        const { list: List, create: Create, remove: Remove } = ProjectController;

        this.connection.addService(contract.Project.service, {
            List,
            Create,
            Remove
        });
    }

    private exposeDataRoutes() {
        const contract = this.buildContract('data');
        const { get: Get, list: List, create: Create } = DataController;

        this.connection.addService(contract.Data.service, { 
            Get,
            List,
            Create
        });
    }

    handle() {
        this.exposeUserRoutes();
        this.exposeProjectRoutes();
        this.exposeDataRoutes();
    }
}
