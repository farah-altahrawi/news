import bcrypt from 'bcryptjs';
import UserModel from '../../../DB/model/user.model.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { AppError } from '../../utils/AppError.js';
import jwt from 'jsonwebtoken';


export const register = async(req,res)=>{
        const {userName,email,password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        await UserModel.create({userName,email,password:hashedPassword});
        const html =`<div> <h2> New User </h2> <p> Welcome ${userName} </p> </div>`
        await sendEmail(email,"welcome",html);
        return res.status(201).json({message:"success"});
}

export const login = async(req,res,next)=>{

    const {email,password} = req.body;

        const user = await UserModel.findOne({
            where:{email:email}
        });
    
        if(user == null){
            return next(new AppError("invalid email",404));
        }
    
        const check = await bcrypt.compareSync(password,user.password);
        if(check == false){
            return next(new AppError("invalid password",400));
        }
    
        const token = jwt.sign({id:user.id, name:user.userName, role:user.role}, 'farah');
        return res.status(200).json({message:"success",token});

}