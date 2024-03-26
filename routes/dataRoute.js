const express = require('express');
const axios = require('axios');

const dataRouter = express.Router();

// Data Routes for external api

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Operations related to fetching data
 * /data:
 *   get:
 *     summary: Fetch data from public API with filtering options
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category to filter the data
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of data items to return
 *     responses:
 *       '200':
 *         description: Data fetched successfully
 *       '400':
 *         description: Bad request or error occurred
 */


// Fetch data from public API with filtering options
dataRouter.get('/', async (req, res) => {
  try {
    const { category, limit } = req.query;
    const response = await axios.get(`https://api.publicapis.org/entries`);
    let data = response.data.entries;
    if(!data){
        res.status(201).send({"message" : '404 Not Found, No Data Found on this endpoint '});    
    }
    if (category) {
      data = data.filter(el => el.Category.toLowerCase() === category.toLowerCase());
    }
    if (limit) {
      data = data.slice(0, limit);
    }

    res.status(200).send(data);

  } catch (err) {
    console.error(err);
    res.status(400).send({"message" : 'Error while fetching data'});
  }
});

module.exports = {dataRouter};
