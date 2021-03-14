const express = require('express');
const User = require('../models/users');

const router = new express.Router();

// User routes
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(`Error: ${e}`);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(`Error: ${e}`);
    }
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
        // const userUpdate = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
        const user = await User.findById(_id);

        if (!user) return res.status(404).send({error: 'user not found'});

        updates.forEach((update) => user[update] = body[update]);

        await user.save();        

        res.status(202).send(user);
    } catch (e) {
        console.log(e)
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