//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/todo-list-db');

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//if error ocuurs print error
db.on('error', console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open', function(){
    console.log("successfully connected to the database");
});