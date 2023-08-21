const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')

//@desc getUsers
//@route GET /ap/Users/
//@access Public
const getUsers= asyncHandler(async (req,res) => {
    const users = await User.find()
 
     res.status(200).json(users)
   
 })
 //@desc getMe
//@route GET /ap/Users/me
//@access Private
const getMe = asyncHandler(async (req,res) => {
 
     res.status(200).json({message: 'get Me'})
   
 })


//@desc loginUser
//@route POST /ap/Users/:id
//@access Public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    if(!email||!password) {
        res.status(400)
        throw new Error('please fill in all fields a name field')
    }
    //check if user exists
    const user = await User.findOne({email})
    if(user){
        if(await bcrypt.compare(password, user.password)){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id)

            });

        }else{
            res.status(400)
            throw new Error('please fill in the correct password')

        }
        

    }else{
        res.status(400)
        throw new Error('user not found')
    }
    

    res.status(200).json({message: 'user login'})
  
})

//@desc registerUser
//@route POST /ap/Users
//@access Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body
    if(!name ||!email||!password) {
        res.status(400)
        throw new Error('please fill in all fields a name field')
    }
    //check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('user exists')

    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    
    const user = await User.create({
        name,
        email,
        password:hashedPassword

    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });



    }else{
        res.status(400)
        throw new Error('invalid user data exists')

    }
  
  
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

}


  module.exports = {
      getMe,
      getUsers,
      loginUser,
      registerUser,
     
  }