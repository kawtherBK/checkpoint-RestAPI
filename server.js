const express= require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());//to support json encoded body
app.use(bodyParser.urlencoded({extended:true}));
const user = require('./Models/user');

require('dotenv').config({ path: "./config/.env" });

const port=process.env.PORT;
app.listen(port,()=>console.log('server is running'));

const mongourl=process.env.MONGO_URL;
//Datbase connection
 mongoose.connect(mongourl,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
      err? console.log(err):console.log('Database is connected')
  });
  //Get All Users
  app.get('/userlist' , function (req , res) {
    user.find({}, (err, users) => err ? console.log(err) : res.json(users));
   })
//Add a new User 
app.post('/Adduser', function (req , res){
    var newUser=new user(req.body);
    newUser.save(function(err,newUser){
        res.json(newUser);
    });
}
)
//Update a user propreties by Id
app.put('/Updateuser/:id', function (req , res){
    var conditions={_id:req.params.id};
    user.updateOne(conditions,req.body).then(
        data=>{
            if(!data){return res.status(404).end();}
        return res.status(200).json(data);
})
.catch(err=>console.log(err))
})
//Delete a user  by Id
app.delete('/deluser/:id', function (req , res){
   user.findByIdAndRemove(req.params.id).then(
    data=>{
        if(!data){return res.status(404).end();}
    return res.status(204).end();
})
.catch(err=>console.log(err))
})
