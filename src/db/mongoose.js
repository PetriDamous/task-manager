const mongoose = require('mongoose');
const User = require('./models/users');
const Task = require('./models/tasks');


const dbUrl = 'mongodb://127.0.0.1:27017/task-manger-api';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});



const user1 = new User({
    name: 'slippy frog',
    age: null,
    email: ' buckwild@gmail.com '
});

user1.save()
    .then((user1) => console.log(user1))
    .catch((e) => console.log('Error:', e));



// const task1 = new Task({
//     description: 'Walk a frog',
//     completed: false
// });

// task1.save()
//     .then(console.log(task1))
//     .catch((e) => console.log(e))