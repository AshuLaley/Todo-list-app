const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./config/mongoose');
const Task = require('./models/tasks');


const port = 8000;
const app = express();



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));


app.set('view engine',"ejs");
app.set ('views', path.join(__dirname,'views'));



var taskList = [
    {
        tname:"Study Math",
        category:"PERSONAL",
        duedate:'2024-05-06'
    },
    {
        tname:"Fill forms",
        category:"HOME",
        duedate:'2024-05-12'
    },
    {
        tname:"Third task",
        category:"WORK",
        duedate:'2024-12-24'
    }
]

app.get("/",function(req,res){

    Task.find({},function(err,tasks){
        if(err){
            console.log('Error in fetching tasks from database');
            return;
        }

        res.render("home", {
            title:"Todo List App",
            task_list: tasks
        });
    });

    
})





// posting data
app.post('/create-task', function(req,res){
    // console.log(req.body);

    // taskList.push({
    //     tname : req.body.task,
    //     duedate: req.body.deadline,
    //     category: req.body.category
    // })

    Task.create({
        taskname:req.body.task,
        category:req.body.category,
        deadline:req.body.deadline
    },function(err,newTask){
        if(err)
        console.log("Error occured while creating a task");

        console.log("*********", newTask);

        return res.redirect("/");
    })
    
})


//delete-tasks
app.get('/delete-tasks',function(req,res){
    let idArray = req.query.id_array;

    //convert the array of strings to an array of MongoDB ObjectIDs
    let objectIdArray = idArray.map(id => mongoose.Types.ObjectId(id));

    //find the tasks in the database using the array of ObjectIDs and delete them
    Task.deleteMany({ _id: { $in: objectIdArray } }, function(err) {
        if (err) {
            console.log("Error in deleting the objects");
            return;
        }

        return res.redirect('back');
    });
});


app.listen(port ,function(err){
    if(err)
    {
        console.log("error",err);
    }

    console.log("The server is up and running on port: "+ port);
});

