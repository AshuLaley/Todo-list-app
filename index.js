const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 8000;
const app = express();



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));


app.set('view engine',"ejs");
app.set ('views', path.join(__dirname,'views'));

// //middleware 1
// app.use(function(req,res,next){
//     console.log("middleware 1 called");
//     next();
// })

// //middleware 2
// app.use(function(req,res,next){
//     console.log("middleware 2 called");
//     next();
// })


var taskList = [
    {
        tname:"Study Math",
        category:"personal",
        duedate:'2024-05-06'
    },
    {
        tname:"Fill forms",
        category:"home",
        duedate:'2024-05-12'
    },
    {
        tname:"Third task",
        category:"work",
        duedate:'2024-12-24'
    }
]

app.get("/",function(req,res){
    res.render("home", {
        title:"Todo List App",
        task_list: taskList
    });
})


// posting data
app.post('/create-task', function(req,res){
    // console.log(req.body);

    taskList.push({
        tname : req.body.task,
        duedate: req.body.deadline
    })
    return res.redirect("/");
})

app.listen(port ,function(err){
    if(err)
    {
        console.log("error",err);
    }

    console.log("The server is up and running on port: "+ port);
})