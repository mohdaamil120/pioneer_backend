const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const jwt = require("jsonwebtoken")
const { userRouter } = require("./routes/userRoute")
const {auth} = require("./middleware/authMiddleware")


const app = express()
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)


app.get("/posts", auth ,(req,res)=>{
    try {
        res.status(200).send({"msg":"Posts Data..."}) 
    } catch (error) {
        res.status(400).send({"error":error})
    }
})


app.listen(4500, async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log("server is runnig at port 4500")
        
    } catch (error) {
        console.log(error)
    }
})
