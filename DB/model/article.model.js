import { sequelize } from '../connection.js';
import { DataTypes } from "sequelize";
import UserModel from './user.model.js';

const articleModel = sequelize.define('Article',
    {
        title:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true,
        },
        description:{
            type:DataTypes.TEXT(),
            allowNull:false,
        },
        articlePic:{
            type:DataTypes.STRING,
            allowNull:true,
        },

    }
);

UserModel.hasMany(articleModel);
articleModel.belongsTo(UserModel);

export default articleModel;