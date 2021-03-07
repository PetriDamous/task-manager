const mongoose = require('mongoose');
const User = require('./models/users');
const Task = require('./models/tasks');


const dbUrl = 'mongodb://127.0.0.1:27017/task-manger-api';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});



// const user1 = new User({
//     name: 'Red Riding Hood',
//     email: ' redHood@gmail.com ',
//     password: 'P@sSWoRd#69!',
//     age: 18,
    
// });

// user1.save()
//     .then((user1) => console.log(user1))
//     .catch((e) => console.log('Error:', e));



const task1 = new Task({
    completed: true
});

task1.save()
    .then(console.log(task1))
    .catch((e) => console.log(e));