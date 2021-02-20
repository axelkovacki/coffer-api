const Mongoose = require('mongoose');

export default class Database {
    connector: any;

    constructor() {
        this.connector = Mongoose;
    }

    start() {
        try {
            this.connector.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } catch (err) {
            console.log(err);
        }
    }
}
