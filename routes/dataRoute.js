const express = require('express');
const axios = require('axios');

const dataRouter = express.Router();

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
