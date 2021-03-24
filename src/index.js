require('dotenv').config();
const express = require('express');
const  tasksRouter = require('./routers/tasks-routes');
const usersRouter = require('./routers/users-routes');

// Run mongoose
require('./db/mongoose');

const app = express();

const port = process.env.PORT;

// Parse incoming JSON data
app.use(express.json());

// User routes
app.use(usersRouter);

// Task router
app.use(tasksRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));