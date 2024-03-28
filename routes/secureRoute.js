const express = require('express');
const { auth } = require('../middleware/authMiddleware');

const secureRouter = express.Router();


// Secure Route Docs

// /**
//  * @swagger
//  * tags:
//  *   name: Secure
//  *   description: Protected routes requiring authentication
//  * /secure/protected:
//  *   get:
//  *     summary: Access protected route
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       '200':
//  *         description: Access granted to protected route
//  *       '401':
//  *         description: Unauthorized
//  *       '500':
//  *         description: Internal server error
//  */


/**
 * @swagger
 * tags:
 *   name: Secure
 *   description: Protected routes requiring authentication
 * /secure/protected:
 *   get:
 *     summary: Access protected route
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Access granted to protected route
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */


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