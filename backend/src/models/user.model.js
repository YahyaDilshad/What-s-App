import mongoose from 'mongoose'



 const userscheam = mongoose.Schema({
    fullname:{
        firstname : {
            type : String,
            minLength : [3,'firstname must be atleasr 3 chatacter long'],
            required : true
        },    
        lastname : {
            type : String
        }
    },
    email:{
        type: String,
        required : true,
        unique : true,
        minLength : [6 ,'email must be atleast 6 charachter long']
    },
    password : { 
      type: String,
      required: true,
      select: false
    },

    profilepic :{
        type : String,
        default : ''
    },
    
},
    {timestamps : true}
)

const User = mongoose.model('User', userscheam);
export default User;