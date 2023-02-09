
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
