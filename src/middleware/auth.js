const {User, secretPhrase} = require('../models/users');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    try {

        const token = req.header('Authorization').slice(7);

        const decoded = jwt.verify(token, secretPhrase);
    
        const {_id} = decoded;

        const user = await User.findOne({_id, 'tokens.token': token});

        if (!user) throw new Error();

        req.user = user;
        req.token = token;
    
        next();
    } catch (e) {
        res.status(401).send();
    }

}

module.exports = auth;