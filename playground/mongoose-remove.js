const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id:'5a43a165f085d5de8859b76c'}).then((todo) => {

// });

Todo.findByIdAndRemove('5a43a165f085d5de8859b76c').then((todo) => {
    console.log(todo);
});