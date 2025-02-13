
import jwt from 'jsonwebtoken';
import articleModel from '../../DB/model/article.model.js';

const articleAuth = () => {
    return async (req, res, next) => {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'farah');

        const { id } = req.params;
        const article = await articleModel.findByPk(id);

        if (decoded.role !== 'admin' && article.UserId !== decoded.id) {
            return res.status(403).json({ message: "not authorized" });
        }
        req.id = decoded.id;
        req.role = decoded.role;

        next();
    };
};

export default articleAuth;