import AES256 from '../../../config/cryptography/AES256';
import MD5 from '../../../config/cryptography/MD5';

export default class DataSchemaService {
    userId: string;
    projectId: string;
    schema: string[];
    payload: any;
    md5: MD5;
    aes256: AES256;

    constructor(userId: string, projectId: string, schema: string[], payload: object[]) {
        this.userId = userId;
        this.projectId = projectId;
        this.schema = schema;
        this.payload = payload;
        this.md5 = new MD5();
        this.aes256 = new AES256(projectId);
    }

    async digest() {
        let data: any = {
            userId: this.userId,
            projectId: this.projectId
        };

        for (let p = 0; p < this.payload.length; p++) {
            for (let s = 0; s < this.schema.length; s++) {
                const currentPayload = this.payload[p];

                if (!currentPayload[this.schema[s]]) {
                    continue;
                }

                const hash = this.md5.encrypt(this.schema[s]);
                data[hash] = this.aes256.encrypt(currentPayload[this.schema[s]]);
            }
        }

        return data;
    }

    async undigest() {
        let data = [];

        for (let p = 0; p < this.payload.length; p++) {
            for (let s = 0; s < this.schema.length; s++) {
                const currentPayload = this.payload[p];
                const hash = this.md5.encrypt(this.schema[s]);

                if (!currentPayload[hash]) {
                    continue;
                }

                let object: any = { token: currentPayload['_id'] };
                object[this.schema[s]] = currentPayload[hash];

                data.push(object);
            }
        }

        return data;
    }
}
