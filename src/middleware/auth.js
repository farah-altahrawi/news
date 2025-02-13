import jwt from 'jsonwebtoken';


const auth = ()=>{
    
    return (req,res,next)=>{
            const {token} = req.headers;
            const decoded = jwt.verify(token,'farah');
        
            if(decoded.role != 'admin'){
                return res.status(400).json({message:"not authorized"});
            }
                req.id = decoded.id;
                req.userName = decoded.userName;
                next();
    }
}

export default auth;


