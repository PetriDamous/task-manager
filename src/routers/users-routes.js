const express = require('express');
const {User} = require('../models/users');
const auth = require('../middleware/auth');

const router = new express.Router();

// User routes
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();        
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

router.post('/users/login', async (req, res) => {   

    try {
        const {body: {email, password}} = req;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        res.send({user, token});
    } catch (e) {
        res.status(400).send({error: 'Incorrect user name or password'});
    }

});

router.post('/users/logout', auth, async (req, res) => {
    try {
        const {user, token: userToken} = req;
        user.tokens = user.tokens.filter((token) => token.token !== userToken);
        await user.save();
        res.status(202).send();
    } catch (e) {
        res.status(500).send();
    }    
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        const {user} = req;
        user.tokens = [];
        await user.save();
        res.send();
    } catch (e) {
        res.status(505).send();
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});


router.patch('/users/me', auth, async (req, res) => {
    const {_id} = req.user;
    const {body} = req;

    const updates = Object.keys(body);
    const allowedUpdates = ["name", "age", "email", "password", "tokens"];

    const isUpdateValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isUpdateValid) return res.status(400).send({error: 'Invalid update parameters'});

    try {
        const user = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});

        res.status(202).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        const {user} = req;
        await user.remove();
        res.status(202).send({status: 'User deleted', user});
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;