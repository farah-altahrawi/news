import { connectDB } from '../DB/connection.js';
import userRouter from './modules/user/user.router.js';
import authRouter from './modules/auth/auth.router.js';
import articleRouter from './modules/article/article.router.js';
import commentRouter from './modules/comment/comment.router.js';
import cors from 'cors';

const initApp = (app,express)=>{

    connectDB();
    app.use(cors());
    app.use(express.json());

    app.use('/users',userRouter);
    app.use('/auth',authRouter);
    app.use('/articles',articleRouter);
    app.use('/comments',commentRouter);
    app.use((err,req,res,next)=>{
        return res.status(400).json({message:err.statusCode});
    });
}

export default initApp;