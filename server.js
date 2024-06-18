const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const dotenv = require("dotenv").config()
const connectDB = require("./config/dbConnection")

const app = express()
const port = process.env.PORT || 3001

// Connect to MongoDB
connectDB()

// Middleware for http request body parsing
app.use(express.json())

// Call on Middleware to import and use the Router
app.use('/api/contacts', require('./routes/contactRoutes'))

// Route for handling users
app.use('/api/users', require('./routes/userRoutes'))

// Call on the error handler middleware
app.use(errorHandler)

// Setup application to lister on port
app.listen(port, () => {
    console.log(`Server is now running on ${port}`);    
})