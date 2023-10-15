const mongoose=require('mongoose');

const User=mongoose.model('User',{
    First_name:{
        type:String
    },
    Last_name:{
        type:String
    },
    Email:{
        type:String
    },
    
    Password:{
        type:String
    }
});

module.exports=User;