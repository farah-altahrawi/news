import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('news', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
  });

export const connectDB = ()=>{
    sequelize.sync()
    .then( ()=>{
        console.log("connection established");
    })
    .catch( (error)=>{
        console.log("error to connect to database" + error);
    })

  }