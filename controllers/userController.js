const asyncHandler = require('express-async-handler') 
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


//@desc Register a User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
     const { username, email, password } = req.body
     if(!username || !email || !password ){
          res.status(400)
          throw new Error("All fields are mandatory!")
     }

     const userAvailable = await User.findOne({ email })
     if(userAvailable){
          res.status(400)
          throw new Error("User already registered!")
     }

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10)
     // console.log("Hashed password is: ", hashedPassword)

     const user = await User.create({
          username, 
          email,
          password: hashedPassword
     })
     
     if(user){
          res.status(201).json(user)
     } else {
          res.status(400)
          throw new Error("User data not valid")
     }
}) 

//@desc Login a User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
     const { email, password } = req.body

     if(!email || !password) {
          res.status(401)
          throw new Error("All fields are mandatory!")
     }

     const user = await User.findOne({ email })

     if(user && (await bcrypt.compare(password, user.password))) {
          const accessToken = jwt.sign({
               user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
               }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m"})
          res.status(200).json({ accessToken })    
     } else {
          json.status(401)
          throw new Error("Invalid username or password!")
     } 
}) 

//@desc Get Current User information
//@route GET /api/users/current
//@access private - access token needed to get in
const currentUser = asyncHandler(async (req, res) => {
     res.status(200).json(req.user)    
}) 

module.exports = { registerUser, loginUser, currentUser }