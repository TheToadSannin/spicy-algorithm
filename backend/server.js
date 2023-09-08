const express = require('express');
const cors = require('cors')
const app = express();
const mongoDB = require('./db');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
mongoDB();  

app.use('/api' ,require('./routes/register.js'))
app.use('/api', require('./routes/loginUser.js'));
app.use('/api', require('./routes/rating.js'));
app.use('/api', require('./routes/review.js'));

app.listen(PORT, ()=>{
    console.log('listening on 5000');
})