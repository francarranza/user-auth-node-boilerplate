import { PasswordHelpers } from "../../../infrastructure/security/password";
import { genUuid4 } from "../../../infrastructure/security/uuid";
import { User, makeUserEntity } from "./User";

const passwordHelpers = new PasswordHelpers();

const UserEntity = makeUserEntity({
  genUuid4: genUuid4,
  passwordHelpers: passwordHelpers,
});

export {
  User,
  UserEntity
}