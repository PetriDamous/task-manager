const {MongoClient, ObjectID} = require('mongodb');

const connectnUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manger';

const id = new ObjectID();

console.log(id.id)


MongoClient.connect(connectnUrl, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    // db.collection('user').findOne({_id: new ObjectID("604049312945c0345c7d965e")}, (error, user) => {
    //     if (error) return console.log('Your search failed you like your mother');

    //     console.log(user);
    // });

    
    // db.collection('user').insertOne({
    //     _id: id,
    //     name: 'Billy Kane',
    //     age: 46
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to add user.');
    //     }

    //     console.log(result.ops)
    // });

    // db.collection('user').find({age: 400}).toArray((error, documents) => {
    //     if (error) return console.log('shit dood I dont know what to tell you');

    //     console.log(documents);
    // });

    // db.collection('user').find({age: 400}).count((error, count) => {
    //     console.log(count)
    // });

    // function addUser() {
    //     let users = [];
    //     for (let i = 0; i < 5; i++) {
    //         users.push({name: 'dog', age: 400});
    //     }

    //     return users;
    // }

    // db.collection('user').insertMany(addUser(), (error, result) => {
    //     if (error) return console.log('fuck man give me a break');

    //     console.log(result.ops);
    // });

    // db.collection('user').insertMany([
    //     {
    //         name: 'dog',
    //         age: 400
    //     },
    //     {
    //         name: 'get money',
    //         age: 45030
    //     }
    // ], (error, result) => {
    //     if (error) return console.log('We fucked up some where');

    //     console.log(result.ops)
    // });

    // const addFiveTasks = () => {
    //     let tasks = [];

    //     for (let i = 0; i < 5; i++) {
    //         tasks.push({description: 'play senran', completed: false});
    //     }

    //     return tasks;
    // }

    // db.collection('task').insertMany(addFiveTasks(), (error, result) => {
    //     if (error) return console.log('damnit we didn\'t win')
    //     console.log(result.ops);
    // });

    // db.collection('task').findOne({_id: new ObjectID("604164136fcf4906783d6328")}, (error, task) => {
    //     if (error) return console.log('Damnit we cannot win');
    //     console.log(task)
    // });

    // db.collection('task').find({completed: false}).toArray((error, tasks) => {
    //     if (error) return console.log('damnit...')
    //     console.log(tasks)
    // });

    // db.collection('task').insertMany([
    //     {
    //         description: 'fix interface error',
    //         completed: true
    //     }, 
    //     {
    //         description: 'touch base with POC',
    //         completed: false
    //     }, 
    //     {
    //         description: 'Add JS file to SIPERNEt',
    //         completed: true
    //     }

    // ], (error, result) => {
    //     if (error) {
    //         return console.log("fuckin shit!!! we really fucked up....");
    //     }

    //     console.log(result.ops);

    // });


    // db.collection('user').updateOne({
    //     _id: new ObjectID("604044caf41ec83830956d5b") 
    // }, {
    //     $inc: {
    //         age: 400
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((e) => {
    //     console.log(e)
    // })

    // db.collection('task').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => console.log(result)).catch((e) => console.log(e))

    // db.collection('task').deleteOne({
    //     description: "touch base with POC"
    // }).then((result) => console.log(result)).catch((e) => console.log(e))

});