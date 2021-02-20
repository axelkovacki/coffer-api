import { createCodec } from 'json-crypto';

export default class Cryptography {
    codec: any;

    constructor(secret: string) {
        this.codec = createCodec(secret);
    }

    encrypt(payload: object) {
        return this.codec.encrypt(payload);
    }

    decript(payload: string) {
        return this.codec.decrypt(payload);
    }
}
