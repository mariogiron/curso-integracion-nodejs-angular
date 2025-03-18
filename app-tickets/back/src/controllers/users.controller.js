const User = require('../models/users.model');

const register = async (req, res, next) => {
    try {
        const result = await User.insert(req.body);
        const user = await User.selectById(result.insertId);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register
}