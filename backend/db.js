require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

const mongoDB = async()=>await mongoose.connect(uri)
    .then(()=>{
        console.log('connected')
    }).catch((error)=>{
        console.log(uri)
        console.log('error', error);
    })
module.exports = mongoDB;
