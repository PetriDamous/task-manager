const express = require('express');
const Task = require('../models/tasks');

const router = new express.Router();

// Task routes
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(`Error ${e}`);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
    const {id: _id} = req.params;

    try {
        const task = await Task.findById(_id);
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const {params: {id: _id}, body} = req;
    const updates = Object.keys(body);
    const allowedUpdate = ["description", "completed"];

    const isValidUpdate = updates.every((update) => allowedUpdate.includes(update));

    if (!isValidUpdate) return res.status(404).send({error: 'Invalid update parameters.'});

    try {
        const taskUpdate = await Task.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
        
        if (!taskUpdate) return res.status(404).send({error: 'Task cannot be found.'});

        res.status(202).send(taskUpdate);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const {params: {id: _id}, body} = req;

    try {
        const taskDelete = await Task.findByIdAndDelete(_id);
        console.log(taskDelete)

        if (!taskDelete) return res.status(404).send({error: 'task cannot be found'});

        res.status(202).send(taskDelete);
    } catch (e) {
        res.status(500).send();
    }

});

module.exports = router;