import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('freedb_newsproject', 'freedb_farah@', 'AEuQH!6%ns8WxQE', {
    host: 'sql.freedb.tech',
    port:3306,
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