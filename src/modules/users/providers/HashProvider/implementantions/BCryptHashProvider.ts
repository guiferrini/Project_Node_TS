import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8); // Cryptografa a senha
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed); // Compara a senha enviada com a cryptografada
  }
}

export default BCryptHashProvider;
