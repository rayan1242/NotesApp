const mongoose = require('mongoose')
require('dotenv').config();
const MongoURL = process.env.mongourl;
console.log(MongoURL);
const connection = mongoose
                    .connect(MongoURL)
                    .then(()=> console.log("connected to mongodb"))
                    .catch((error)=> console.log(error));

module.exports = {
    connection
}