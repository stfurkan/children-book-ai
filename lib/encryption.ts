import { randomBytes, createCipheriv, createDecipheriv, CipherGCMTypes } from 'crypto';

const algorithm: CipherGCMTypes = 'aes-256-gcm';
const secretKey = process.env.SECRET_KEY!;

// Encryption function
export function encrypt(text: string): { encryptedData: string; iv: string; authTag: string } {
    const iv = randomBytes(16); // Generate a unique IV for each encryption
    const cipher = createCipheriv(algorithm, secretKey, iv);

    let encryptedData = cipher.update(text, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
        encryptedData,
        iv: iv.toString('hex'),
        authTag
    };
}

// Decryption function
export function decrypt(encryptedData: string, iv: string, authTag: string): string {
    const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');

    return decryptedData;
}
