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
      createdAt = new Date(),
      updatedAt = new Date(),
    }: {
      uuid?: Uuid,
      email: Email,
      password: string;
      createdAt?: Date,
      updatedAt?: Date,
    }) {

      this.validateEmail(email);
      this.validatePassword(password);

      this.uuid = uuid || genUuid4();
      this.email = email;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.hashedPassword = passwordHelpers.hashPassword(password);
    }

    validateEmail = (email: Email) => {
      if (!email) throw new EntityFieldError('User email is empty');
      // Todo: more validations
    }

    validatePassword = (password: string) => {
      if (!password) throw new EntityFieldError('User password is empty');
      if (password.length < 8) throw new EntityFieldError('Password should have at least 8 characters');
    }
  }
}

