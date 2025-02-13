import articleModel from "../../../DB/model/article.model.js";
import UserModel from "../../../DB/model/user.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from '../../utils/cloudinary.js';


export const getArticle =  async (req,res)=>{
    const articles = await articleModel.findAll({
        attributes:['id','title','description'],
        include:{
            model:UserModel,
            attributes:['id','userName'],
        }
    });
    return res.status(200).json({message:"success",articles});
}

export const createArticle = async (req,res)=>{
    const {title,description} = req.body;
    const article = await articleModel.create({title,description,UserId:req.id});
    return res.status(201).json({message:"success",article});
}

export const getDetails = async (req,res,next)=>{
    const {id} = req.params;
    const article = await articleModel.findByPk(id);
    if(article==null){
        return next(new AppError("article not found",404))
    }
    return res.status(200).json({message:"success",article});

}

export const deleteArticle = async(req,res,next)=>{
    const {id} = req.params; 
    const article = await articleModel.findByPk(id);
    if(article == null){
        return next(new AppError("article not found",404));
    }

    await articleModel.destroy({
        where:{
            id
        }
    });

    return res.status(200).json({message:"success"});
}

export const uploudArticleImage = async(req,res,next)=>{
    const {id} = req.params; 
    const article = await articleModel.findByPk(id);
    if(article == null){
        return next(new AppError("article not found",404));
    }
    const {secure_url} = await cloudinary.uploader.upload(req.file.path);
    article.articlePic = secure_url;
    await article.save();
    return res.status(200).json({message:"success"});
}