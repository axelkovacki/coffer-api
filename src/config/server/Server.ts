import FastifyConf from 'fastify';
import Routes from './Routes';

export default class Server {
    connection: any;

    constructor() {
        this.connection = FastifyConf({ logger: true });
    }

    async start() {
        try {
            this.connection.register(require('fastify-cors'));
            this.connection.register(Routes.handler);
            await this.connection.listen(process.env.PORT || 8080, '0.0.0.0');
            
            this.connection.log.info(`server listening on ${this.connection.server.address().port}`);
        } catch (err) {
            this.connection.log.error(err);
            process.exit(1);
        }
    }
}
