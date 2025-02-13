
import jwt from 'jsonwebtoken';
import commentModel from '../../DB/model/comment.model.js';

const commentAuth = () => {
    return async (req, res, next) => {
        const { token } = req.headers;
        const decoded = jwt.verify(token, 'farah');

        const { id } = req.params;
        const comment = await commentModel.findByPk(id);

        if (decoded.role !== 'admin' && comment.Userid !== decoded.id) {
            return res.status(403).json({ message: "not authorized" });
        }
        req.id = decoded.id;
        req.role = decoded.role;

        next();
    };
};

export default commentAuth;