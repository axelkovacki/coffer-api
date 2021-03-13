import Crypto from 'crypto';

export default class MD5 {
    encrypt(payload: string) {
        return Crypto.createHash('md5').update(payload).digest('hex');
    }
}
