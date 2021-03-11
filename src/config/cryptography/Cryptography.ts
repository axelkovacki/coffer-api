import Crypto from 'crypto';

export default class Cryptography {
    key: Buffer;

    constructor(secret: string) {
        this.key = this.createKey(secret);
    }

    createKey(secret: string) {
        return Crypto.createHash('sha256').update(secret).digest();
    }

    encrypt(payload: string) {
        const iv = Crypto
            .createHash('sha256')
            .update(Crypto.randomBytes(48).toString('hex'))
            .digest();

        const resizedIV = Buffer.allocUnsafe(16);
        iv.copy(resizedIV);

        const cipher = Crypto.createCipheriv('aes256', this.key, resizedIV);
        
        const msg = [];
        msg.push(cipher.update(payload, 'binary', 'hex'));
        msg.push(cipher.final('hex'));

        return encodeURIComponent(
            JSON.stringify([resizedIV.toString('hex'), msg.join('')])
        );
    }

    decript(payload: string) {
        const [iv, ciphertext] = JSON.parse(decodeURIComponent(payload));

        const bufferIV = Buffer.from(iv, 'hex');
        const decipher = Crypto.createDecipheriv('aes256', this.key, bufferIV);

        const msg = [];
        msg.push(decipher.update(ciphertext, 'hex', 'binary'));
        msg.push(decipher.final('binary'));
        
        return msg.join('');
    }
}
