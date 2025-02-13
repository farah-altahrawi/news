import jwt from 'jsonwebtoken';
import UserModel from '../../DB/model/user.model.js';


const userAuth = ()=>{
    
    return async (req,res,next)=>{
            const {token} = req.headers;
            const decoded = jwt.verify(token,'farah');

            const { id } = req.params;
            const user = await UserModel.findByPk(id);

            if (decoded.role !== 'admin' && user.id !== decoded.id) {
                return res.status(403).json({ message: "not authorized" });
            }
            req.id = decoded.id;
            req.role = decoded.role;
            req.userName = decoded.userName;
            next();
    }
}

export default userAuth;

