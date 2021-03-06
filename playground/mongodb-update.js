//const MongoClient = require('mongodb').MongoClient;

//same as above,just using es6 destructuring,here you can pull multiple variables out
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a39feeecdda6c968cc67612')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a38dc1f9bb0571934809299')
    }, {
        $set: {
            name: 'John'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});
