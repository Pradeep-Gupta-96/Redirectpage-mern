import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/Routsdb",()=>{
    console.log("db connected")
})

const userSchema= new mongoose.Schema({
    name: String, 
    password: String, 
    selecter: String
})

const User=new mongoose.model("users",userSchema)

app.post('/signup',async(req,res)=>{
    const {name,password,selecter}=req.body
   try {
    if(!name || !password || !selecter){
      return res
      .status(400)
      .json({message:"might be you skip somethig"})
    }
    const user=await User.findOne({name:name})
    if(user){
        return res
        .status(422)
        .json({message:"user allready register"})
    }else{
        const user= new User({
            name,password,selecter 
        })
        await user.save()
        return res
        .status(200)
        .json({message:"user succefully register"})
    }
   } catch (error) {
    res.status(400).json({message:"error"})
   }
})


app.post("/signin",async(req,res)=>{
    const{name,password}=req.body
    try {
        if(!name || !password){
            return res.status(400).json({message:"might be yo skip something"})
        }
      const user=await User.findOne({$and:[{name:name},{password:password}]})
      if(user){
        return res.status(200).json(user)  
    }else{
          return res.status(400).json({message:"invaoild credential"})
      }
    } catch (error) {
        res.status(404).json({message:"error"})
    }
})


app.get('/',(req,res)=>{
    res.status(200).json({message:"your api is running"})
})

app.get('/api/users',(req,res)=>{
    User.find((error,item)=>{
        if( error) return res.status(404).json({message:"error"})
        res.status(200).send(item)
    })
})

app.listen(4000,()=>{
    console.log("listen 4000")
})