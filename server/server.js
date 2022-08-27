//get and use express as a variable called app
const express = require('express')
const app = express()
//to set server and make it running 
app.listen(3001, (() => console.log("server is running on port 3001")))
// necessary to get the information from frontend in json format
app.use(express.json())
//importing mongoose and connecting to the database
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/ToDoList", {
    useNewUrlParser: true
})
//importing the tasks model and User model from the path
const taskModel = require('./models/Tasks')
const userModel = require('./models/Users')
//cors is required to communicate with the apis that we create
const cors = require('cors')
app.use(cors());
const bodyParser = require('body-parser')
const path = require('path')
// to get date
const date = new Date();


//whenever anyone gets to this route initiate this
// app.get('/', async (req,res) => {
//     const task = new taskModel({taskType: 'personal', taskName: 'go to gym', dueDate: date,description: 'do excercise', email:'chetanakash1234@gmail.com'})
//     try{ // save the task 
//          await task.save();}  
//     catch(error) {console.log(error);}
// })



//to post the data received from the frontend
app.post('/tasks', async (req,res) => {
    const task = new taskModel({taskType: req.body.taskType, taskName: req.body.taskName, dueDate: req.body.date,description: req.body.desc, email:req.body.email, status: req.body.status})
    try{
        await task.save();
    }
    catch(error){
        console.log(error);
    }
})

//to get the data from the database
app.get('/read/:email', async (req,res) => {
    const email = req.params.email;
    taskModel.find({email:email}, (error, result) => { 
        if(error){
            console.log(error);
        }
        res.send(result);
    });
    
});

//to set the status of task to true
app.put('/setDone',async (req,res) => {
    const id = req.body.id
    try{
            await taskModel.findById(id, (err, theTask) => {
                    theTask.status = true;
                    theTask.save();
                    res.send("updated")
            });
    }
    catch(err){
        console.log(err)
    }
});

//to set the status of task to false
app.put('/setunDone',async (req,res) => {
    const id = req.body.id
    try{
            await taskModel.findById(id, (err, theTask) => {
                    theTask.status = false;
                    theTask.save();
                    res.send("updated")
            });
    }
    catch(err){
        console.log(err)
    }
});

//to delete the task 
app.delete('/delete/:id',async  (req,res) => {
    const id = req.params.id
        try{
            await taskModel.findByIdAndRemove(id).exec();
        }
        catch(err){
            console.log(err);
        }
})

//to save users
app.post('/register',  (req,res) => {
   
    userModel.findOne({email:req.body.email},(err, user) => {
        if(user){
            res.send({message: "user already registered!", auth: false})
        }
        else{
            const newuser = new userModel({name: req.body.name, email: req.body.email, password: req.body.password})
        try{
            newuser.save();
            res.send({message: "registration successful", auth: true})
            }
         catch(err){
            console.log(err)
            
        }

        }
    })
    
})

//check if the user is registered or not
app.post('/login', (req,res) => {
    const email = req.body.email
    const password = req.body.password

    userModel.findOne({email:email},(err,user) => {
        if(user){
            if(user.password === password){
                res.send({message: "login success", user:user, auth: true})
            }
            else{
                res.send({message: "wrong credentials", auth: false})
            }
        }
        else{
            res.send({message: "not registered!"})
        }
    } )
})