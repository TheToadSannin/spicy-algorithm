require('dotenv').config();
const mongoose = require('mongoose');
const uri = "mongodb+srv://gauxrav:14aca70dc47e69g@cluster-feedback.hhpzfks.mongodb.net/mess-feedback";

const mongoDB = async()=>await mongoose.connect(uri)
    .then(()=>{
        console.log('connected')
    }).catch((error)=>{
        console.log(uri)
        console.log('error', error);
    })
module.exports = mongoDB;
