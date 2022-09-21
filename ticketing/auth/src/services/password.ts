import { scrypt,randomBytes } from 'crypto';
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class password{
    static async toHash(password: string){
        const salt = randomBytes(8).toString('hex')
        const buf = (await scryptAsync(password,salt,64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`
    }
    static async compare(storesPassword: string,suppliedPassword:string){
        const [hassedpassword,salt]=storesPassword.split('.')
        const buf = (await scryptAsync(suppliedPassword,salt,64)) as Buffer;

        return buf.toString('hex')===hassedpassword;
    }
} 