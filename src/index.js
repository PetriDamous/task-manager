const express = require('express');
const  tasksRouter = require('./routers/tasks-routes');
const usersRouter = require('./routers/users-routes');

// Run mongoose
require('./db/mongoose');

const app = express();

const port = process.env.PORT || 3000;

// Parse incoming JSON data
app.use(express.json());

// User routes
app.use(usersRouter);

// Task router
app.use(tasksRouter);

const Task = require('./models/tasks');
const { User } = require('./models/users');

const main = async () => {
    // const task = await Task.findById("60527e90e0c0d6537053f763");
    // await task.populate("owner").execPopulate();
    // console.log(task.owner)

    const user = await User.findById("6052789d1e7d085754377bdd")
    await user.populate("tasks").execPopulate()
    console.log(user.tasks)
};

// main()

app.listen(port, () => console.log(`Server is running on port ${port}`));