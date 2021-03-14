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

    digest() {
        let data: any = [];

        for (let p = 0; p < this.payload.length; p++) {
            const currentPayload = this.payload[p];

            data.push({
                userId: this.userId,
                projectId: this.projectId
            });

            for (let s = 0; s < this.schema.length; s++) {
                const currentSchema = this.schema[s];

                if (!currentPayload[currentSchema]) {
                    continue;
                }

                const hash = this.md5.encrypt(currentSchema);
                data[p][hash] = this.aes256.encrypt(currentPayload[currentSchema]);
            }
        }

        return data;
    }

    undigest() {
        let data = [];

        for (let p = 0; p < this.payload.length; p++) {
            const currentPayload = this.payload[p].toObject();

            let object: any = {
                _id: currentPayload._id,
                createdAt: currentPayload.createdAt
            };

            for (let s = 0; s < this.schema.length; s++) {
                const currentSchema = this.schema[s];
                const hash = this.md5.encrypt(currentSchema);

                if (!currentPayload[hash]) {
                    continue;
                }

                object[currentSchema] = this.aes256.decript(currentPayload[hash]);
            }

            data.push(object);
        }

        return data;
    }
}
