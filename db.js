const mongoose = require('mongoose');

const schema = mongoose.Schema;
const ObjectID = schema.ObjectId;

const User = new schema({
    email: {type:String,unique:true} ,
    password:String,
    name: String
});

const Todo =new  schema({
    title:String,
    done:Boolean,
    userId:String
}) 

const UserModel = mongoose.model("users",User);
const TodoModel = mongoose.model("todos",Todo);

module.exports ={
    UserModel : UserModel,
    TodoModel:TodoModel
}
