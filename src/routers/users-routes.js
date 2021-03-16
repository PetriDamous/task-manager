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

router.post('/users/logout', (req, res) => {
    res.send('fuck you')
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
    try {
        const {id: _id} = req.params;
        const user = await User.findById(_id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    const {params: {id: _id}, body} = req;
    const updates = Object.keys(body);
    const allowedUpdates = ["name", "age", "email", "password"];

    const isUpdateValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isUpdateValid) return res.status(400).send({error: 'Invalid update parameters'});

    try {
        const user = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});

        if (!user) return res.status(404).send({error: 'user not found'});

        res.status(202).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    const {params: {id: _id}} = req;

    try {
        const userDelete = await User.findByIdAndDelete(_id);
        if (!userDelete) return res.status(404).send({error: 'User cannot be found.'});


        res.status(202).send({status: 'User deleted', ...userDelete});
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;