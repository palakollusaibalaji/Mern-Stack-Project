const express = require('express');
const User = require('../models/user');
const {jsonSignToken} = require('../serives/userSerives')
const route = express.Router();

route.post("/signup",async (req,res) => {
  const {email,password,userName} = req.body;
  try{

     if(!email||!password||!userName){
      return res.status(404).json({msg:"All fields are required"})
     }
     
     const alreadyExitUSer = await User.findOne({email})
     if(alreadyExitUSer) {
       return res.status(409).json({msg:"user already exits"})
     }

     const user = await User.create({
        email,password,userName
      })
      
      console.log(user);
      
     return res.status(201).json({msg : 'user register'});
     
  }catch(error) {
    console.log(error);
    res.status(500).json({msg:"server error"})
};
   
});

route.post("/signin",async (req,res)=>{
 const{email,password} = req.body;
 console.log('email and password : ',email,password);
try{

  if(!email||!password) {
    return res.status(404).json({msg:"All fields are requied"});
  }
  console.log("matchingmaking....");
  
    const user = await User.matchingMaking(email,password);
    if(!user) {
        return res.status(401).json({msg:"user not found"});
    }
    console.log("user details: ",user);

    const token = jsonSignToken(user);
    console.log('token : ',token);
    return res.cookie('token',token,{httpOnly:true,
      maxAge:3000000,expires:360000}).json({msg:"user successfully login",token:token});

}catch(error){
  res.status(500).json({msg:'server issues'});
}
})

module.exports = route;