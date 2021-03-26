const {setEnv} = require('./utility/utility');
require('dotenv').config(setEnv('test'));
const express = require('express');
const  tasksRouter = require('./routers/tasks-routes');
const usersRouter = require('./routers/users-routes');

// Run mongoose
require('./db/mongoose');

const app = express();

// Parse incoming JSON data
app.use(express.json());

// User routes
app.use(usersRouter);

// Task router
app.use(tasksRouter);

module.exports = app;