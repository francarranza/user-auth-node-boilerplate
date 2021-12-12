import { EntityFieldError } from "../../../core/BaseErrors";
import { Uuid } from "../../../core/BaseTypes";
import { IPasswordHashing } from "../../../infrastructure/security/password";

type Email = string;

export interface User {
  uuid?: Uuid;
  email: Email;
  hashedPassword: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function makeUserEntity ({
  genUuid4,
  passwordHelpers,
}: {
  genUuid4: Function,
  passwordHelpers: IPasswordHashing,
}) {

  return class UserEntity {
    uuid: Uuid;
    email: Email;
    hashedPassword: string;
    createdAt: Date;
    updatedAt: Date;

    constructor({
      uuid,
      email,
      password,
      hashedPassword,
      createdAt = new Date(),
      updatedAt = new Date(),
    }: {
      uuid?: Uuid,
      email: Email,
      password?: string,
      hashedPassword?: string,
      createdAt?: Date,
      updatedAt?: Date,
    }) {

      this.validateEmail(email);
      this.validatePassword({ uuid, password });

      this.uuid = uuid || genUuid4();
      this.email = email;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.hashedPassword = hashedPassword || passwordHelpers.hashPassword(password);
    }

    validateEmail = (email: Email) => {
      if (!email) throw new EntityFieldError('User email not provided');
      // Todo: more validations
    }

    validatePassword = ({ uuid, password }: { uuid: Uuid, password: string }) => {
      // User already in db. Already has hashed password
      if (uuid) return;

      if (!password) throw new EntityFieldError('User password not provided');
      if (password.length < 8) throw new EntityFieldError('Password should have at least 8 characters');
    }
  }
}

