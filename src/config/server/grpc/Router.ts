import path from 'path';
import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

import DataController from '../../../modules/data/controllers/DataGrpcController';

export default class Router {
    connection: any;
    protoOptions: object;

    constructor(connection: any) {
        this.connection = connection;
        this.protoOptions = {
            keepCase: true,
            longs: String,
            enums: String,
            arrays: true,
        max_receive_message_length: 5384392
        };
    }

    buildContract(contract: string) {
        const contractPath = path.resolve(`${__dirname}../../../../contracts/${contract}.proto`);
        const packageDefinition = loadSync(contractPath, this.protoOptions);
        const proto = loadPackageDefinition(packageDefinition);

        return proto;
    }

    handle() {
        // const userContract = this.buildContract('user');

        // this.connection.addService(userContract.User.service, {
        //     login: (call: any, callback: any) => {
        //         console.log(call.request);
        //         const data = {
        //             _id: '1',
        //             name: '2',
        //             email: '3',
        //             password: '4',
        //             active: true,
        //             apiKey: '6'
        //         };

        //         callback(null, { data })
        //     }
        // });

        const dataContract = this.buildContract('data');
        
        this.connection.addService(dataContract.Data.service, { 
            get: DataController.get,
            list: DataController.list,
            create: DataController.create
        });
    }
}
