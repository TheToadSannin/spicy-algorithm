const express = require('express');
const cors = require('cors')
const app = express();
const mongoDB = require('./db');

app.use(cors());
app.use(express.json())
mongoDB();  

app.use('/api' ,require('./routes/register.js'))
app.use('/api', require('./routes/loginUser.js'));
app.use('/api', require('./routes/rating.js'));

app.listen(5000, ()=>{
    console.log('listening on 5000');
})