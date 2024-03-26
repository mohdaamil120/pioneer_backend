const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect(process.env.MONGOURL)

// const connection = mongoose.connect(process.env.LOCALDB)

module.exports = {
    connection
}