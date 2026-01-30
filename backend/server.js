require('dotenv').config()
const express = require('express')
const userRoute = require('./routes/user.route')
const profileRoute = require('./routes/profile.route')
const cors = require('cors')
const connectDB = require('./config/db')
const cookieParser = require("cookie-parser")


const app = express()

app.use(express.json())
connectDB()
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

app.use('/api/users', userRoute)
app.use('/api/profile', profileRoute)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})