import { compare, hash } from 'bcryptjs';

export default class BCryptHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashed = hash(payload, 8);
    return hashed;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const isTrue = compare(payload, hashed);
    return isTrue;
  }
}
