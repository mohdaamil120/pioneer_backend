const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoute")
const { dataRouter } = require("./routes/dataRoute")
const secureRouter = require("./routes/secureRoute")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const app = express()
app.use(express.json())
app.use(cors())

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express API Documentation',
        version: '1.0.0',
      },
      servers:[
        {
            url: "https://pioneer-backend-9d6u.onrender.com"
        },
        {
          url: "http://localhost:4500"
        }
      ]
    },
    apis: ['./routes/*.js'], // files containing annotations as above (* is for select all .js files that are present in routes folder) 
  };


const openapiSpecification = swaggerJsdoc(options);


app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(openapiSpecification))

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
