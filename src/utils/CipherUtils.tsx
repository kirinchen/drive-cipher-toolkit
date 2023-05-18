import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
export class CipherUtils {
    public static instance: CipherUtils = new CipherUtils();
    private CipherUtils() { }

    public encrypt(text: string, pass: string): string {
        const ciphertext = AES.encrypt(text, pass).toString();
        return ciphertext;
    }

    public decrypt(cipherText: string, pass: string): string {
        const bytes = AES.decrypt(cipherText, pass);
        const originalText = bytes.toString(encUtf8);
        return originalText;
    }
}