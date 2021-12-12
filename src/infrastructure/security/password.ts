import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

export interface IPasswordHashing {
  hashPassword(password: string): string;
}

export class PasswordHashingError extends Error {}

export class PasswordHelpers implements IPasswordHashing {
  private bcrypt;

  constructor() {
    this.bcrypt = bcrypt;
  }

  hashPassword(password: string) {
    try {
      const salt = this.bcrypt.genSaltSync(SALT_ROUNDS);
      return this.bcrypt.hashSync(password, salt);
    } catch (error) {
      throw new PasswordHashingError('Cant hash password');
    }
  }

  async isValid(password: string, hashedPassword: string) {
    return await this.bcrypt.compare(password, hashedPassword);
  }
}
