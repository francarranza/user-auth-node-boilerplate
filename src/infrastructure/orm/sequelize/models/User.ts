import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { User } from '../../../../modules/users/domain/User';

interface UserCreationAttributes extends Optional<User, 'uuid'> {}

export interface UserInstance extends Model<User, UserCreationAttributes> {}

const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    email: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      unique: true,
    },
    hashedPassword: {
      unique: true,
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { tableName: 'users' },
);

export default UserModel;
