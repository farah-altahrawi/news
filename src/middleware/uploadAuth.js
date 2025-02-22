import jwt from 'jsonwebtoken';
import UserModel from '../../DB/model/user.model.js';


const uploadAuth = ()=>{
    
    return async (req,res,next)=>{
            const {token} = req.headers;
            const {id} = req.params; 
            const decoded = jwt.verify(token,'farah');

            const user = await UserModel.findByPk(id);
            if (user == null) {
                return res.status(401).json({ message: "User not found" });
            }
            if (decoded.role !== 'admin' && user.id !== decoded.id) {
                return res.status(403).json({ message: "not authorized" });
            }
            req.id = decoded.id;
            req.role = decoded.role;
            req.userName = decoded.userName;
            next();
    }
}

export default uploadAuth;




