const express = require('express');
const { auth } = require('../middleware/authMiddleware');

const secureRouter = express.Router();

// Example protected route
secureRouter.get('/protected', auth, async (req, res) => {
    try {
        res.status(200).send({ "message": 'This is a protected route only for authenticated users' });
    } catch (err) {
        res.status(400).send({"message": 'something wrong in protected route catch block',"Error":err})
    }
});


module.exports = secureRouter;




// Example

// app.get("/posts", auth ,(req,res)=>{
//     try {
//         res.status(200).send({"msg":"Posts Data..."}) 
//     } catch (error) {
//         res.status(400).send({"error":error})
//     }
// })