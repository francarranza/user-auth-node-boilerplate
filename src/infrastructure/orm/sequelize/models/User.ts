import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { User } from '../../../../modules/users/domain/User';

interface UserCreationAttributes extends Optional<User, 'id'> {}

export interface UserInstance extends Model<User, UserCreationAttributes> {}

const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      unique: true,
    },
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
