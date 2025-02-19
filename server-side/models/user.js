const mongoose = require('mongoose')
const{createHmac} = require('crypto');
const userSchema = new mongoose.Schema({

  userName : {
    type :String,
    required : true
  },

  email : {
    type:String,
    required:true,
    unique : true
  },
  
  password:{
    type:String,
    required : true
  },

  salt : {
    type: String
  }


},{
    timeseries:true,
});

userSchema.pre('save',function(next) {
   const user = this;
    if(!user.isModified('password')) return next();

    const salt = "saibalaji49385$%#";
    const userPassword = createHmac('sha256',salt).update(user.password).digest('hex');
    user.salt = salt;
    user.password = userPassword;

    next();
});

userSchema.static("matchingMaking",async function(email,password) {
 const user = await this.findOne({email});
  
 console.log(user);

 if(!user) {
    throw new Error("user not found");
 }

  const salt = user.salt;
  const originalPassword = user.password;
  const matchingPassword = createHmac('sha256',salt).update(password).digest('hex');
  if(originalPassword != matchingPassword) {
    throw new Error('password is invalid')
  }
  
  return user;

})



const  User = mongoose.model('user',userSchema);

module.exports=User;