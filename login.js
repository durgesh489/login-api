const express=require("express")
const mongoose=require("mongoose")



const app=express()
app.use(express.json())

mongoose.connect('mongodb://Akash1133:Akash123@cluster0-shard-00-00.6a2pm.mongodb.net:27017,cluster0-shard-00-01.6a2pm.mongodb.net:27017,cluster0-shard-00-02.6a2pm.mongodb.net:27017/login?ssl=true&replicaSet=atlas-ay6lm2-shard-0&authSource=admin&retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}

);
//userschema
const UserSchema= new mongoose.Schema({

    username:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        max:50,
        required:true
    }, 
    password:{
        type:String,
        required:true,
        min:7
    },
},

{
    timestamps:true
});

//user model
const User=mongoose.model('User',UserSchema)

//login post
app.post('/login',async(req,res)=>{
    const user =new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
      })
    try {  
        //create new user
     
       //save user and return response
        await user.save()
          if(!user)
          {
              res.status(400).send("user not provided")
          }
          
          res.status(200).send(user)
      }  
     catch (error) {
          res.status(500).send("can't sign in")
          
        }  

})

app.get()



app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(3000,()=>{
    console.log("app started")
})
