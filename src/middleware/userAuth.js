import jwt from 'jsonwebtoken';
import UserModel from '../../DB/model/user.model.js';
import { json } from 'sequelize';


const userAuth = ()=>{
    
    return async (req,res,next)=>{
            const {token} = req.headers;
            const decoded = jwt.verify(token,'farah');

            const user = await UserModel.findByPk(decoded.id);
            if (user == null) {
                return res.status(401).json({ message: "User not found" });
            }

            if (decoded.role !== 'admin' && decoded.id !== user.id) {
                return res.status(403).json({ message: "not authorized" });
            }
            req.id = decoded.id;
            req.role = decoded.role;
            req.userName = decoded.userName;
            next();
    }
}

export default userAuth;



