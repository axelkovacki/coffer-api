import Mongoose from 'mongoose';

export default class Database {
    connector: any;

    constructor() {
        this.connector = Mongoose;
    }

    start() {
        try {
            const {
                MONGO_USERNAME,
                MONGO_PASSWORD,
                MONGO_HOSTNAME,
                MONGO_PORT,
                MONGO_DB
            } = process.env;
    
            const options = {
                useNewUrlParser: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500,
                connectTimeoutMS: 10000,
            };

            const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

            this.connector.connect(url, options);
        } catch (err) {
            console.log(err);
        }
    }
}
