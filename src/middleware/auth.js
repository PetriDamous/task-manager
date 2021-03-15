const {User, secretPhrase} = require('../models/users');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    try {

        const token = req.header('Authorization').slice(7);
    
        const verifiedToken = jwt.verify(token, secretPhrase);
    
        const {_id} = verifiedToken;

        console.log(_id)

        const verifiedUser = await User.findOne({_id, "tokens:token": token});

        console.log(verifiedUser)

        if (!verifiedUser) throw new Error();

        req.user = verifiedUser;
    
    
        // console.log(token)
    
        next();
    } catch (e) {
        res.status(401).send();
    }

}

module.exports = auth;