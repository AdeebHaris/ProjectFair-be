const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

//controller method for user register
exports.register = async(req,res)=>{
    // store the user details to DB
    console.log("inside user register controller");
    const {username,email,password} = req.body
    // check email id present or not
    try{
        const existingUser = await users.findOne({email:email})
        if(existingUser){
            res.status(400).json("Account already exists")
        }
        else{
            console.log("User does not exist");
            const newUser = new users({
                username:username,
                email:email,
                password:password,
                github:"",
                linkedin:"",
                profile:""
    
            });
            await newUser.save();
            res.status(201).json("User Registered Successfully")
            // 201 is the status code of successfully created
        }
    }
    catch (err){
        res.status(401).json("Register requeest failed due to",err)
    } 
}

exports.login = async(req,res)=>{
    console.log("Inside login controller");
    const {email,password} = req.body;
    try{
        const existingUser = await users.findOne({email:email,password:password});
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"userpwd123") // 2 aruguement is mandatory here
            
            res.status(200).json(
                {
                    data:existingUser,
                    token:token
                }
            )
        }
        else{
            res.status(401).json("Invalid Username or Password")
            
        }
    }
    catch(error){
        res.status(500).json("Internal Server Error")
    }  
}
exports.getUserDetails = (req,res)=>{
    res.status(200).json("inside getuserdetails controller")
}