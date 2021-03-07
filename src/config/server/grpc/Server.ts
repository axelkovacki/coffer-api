import Router from './Router';
import { Server as ServerGrpc, ServerCredentials } from '@grpc/grpc-js';

export default class Server {
    connection: any;
    router: any;

    constructor() {
        this.connection = new ServerGrpc();
        this.router = new Router(this.connection);
    }

    async start() {
        try {
            this.router.handle();
            this.connection.bindAsync(
                '0.0.0.0:8081',
                ServerCredentials.createInsecure(),
                () => this.connection.start()
            );
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}
