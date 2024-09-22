const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const {TodoModel, UserModel} = require('./db');
const { JWT_SECRET,auth } = require('./auth');
const mongoose  = require('mongoose');

mongoose.connect('mongodb+srv://charmtechic:ravi6577@cluster0.94ncv.mongodb.net/todo-app-db');

app.use(express.json());

app.post('/signup',async (req,res)=>{
   const username = req.body.username;
   const password = req.body.password;
   const name = req.body.name;


await UserModel.create({
    email:username,
    password:password,
    name : name
   })

   res.status(200).json({
    "message":"You are sign up!!" 
   })

});
app.post('/login',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
   
  const user =await  UserModel.findOne({
        email : username,
        password:password,
    })

    if(user){
      const token = jwt.sign({
        id : user._id
      },JWT_SECRET);
      
      res.status(200).json({
        "token": token
      });
    }
    else {
        res.status(403).json({
            "message": "InValid Credentails"
        })
    }
});
app.post('/todo',auth,async(req,res)=>{
    
  const userId = req.userId;
  console.log(userId);
 await  TodoModel.create({
    title: "task3",
    done : false,
    userId:userId
  });

  res.status(200).json({
    message:"successfull add",
    userId:userId
  });
});


app.post('/todos',auth,async(req,res)=>{
  
  const userid = req.userId;
  console.log(userid);
  const todos = await TodoModel.find({
        userId: userid
  });

  if(todos){
    res.send({
      todos:todos
    })
  }
  else {
    res.status(403).json({
      message:"No user found"
    });
  }
});

app.listen(8000);