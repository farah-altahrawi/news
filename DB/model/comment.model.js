import { sequelize } from '../connection.js';
import { DataTypes } from "sequelize";
import UserModel from './user.model.js';

const commentModel = sequelize.define('Comment',
    {
        description:{
            type:DataTypes.TEXT(),
            allowNull:false,
        }

    }
);

UserModel.hasMany(commentModel);
commentModel.belongsTo(UserModel);

export default commentModel;