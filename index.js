const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoute")
const { dataRouter } = require("./routes/dataRoute")
const secureRouter = require("./routes/secureRoute")


const app = express()
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/data", dataRouter)
app.use("/secure", secureRouter)




app.listen(4500, async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log("server is runnig at port 4500")
        
    } catch (error) {
        console.log(error)
    }
})
