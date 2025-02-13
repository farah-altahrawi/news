import commentModel from "../../../DB/model/comment.model.js";
import UserModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";

export const getComment =  async (req,res)=>{
    const comments = await commentModel.findAll({
        attributes:['description'],
        include:{
            model:UserModel,
            attributes:['id','userName'],
        }
    });
    return res.status(200).json({message:"success",comments});
}

export const createComment = async (req,res)=>{
    const {description} = req.body;
    const comment = await commentModel.create({description,UserId:req.id,userName:req.userName});
    return res.status(201).json({message:"success",comment});
}


export const deleteComment = async(req,res,next)=>{
    const {id} = req.params; 
    const comment = await commentModel.findByPk(id);
    if(comment == null){
        return next(new AppError("comment not found",404));
    }

    await commentModel.destroy({
        where:{
            id
        }
    });

    return res.status(200).json({message:"success"});
}