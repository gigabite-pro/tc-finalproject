const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//db connection
mongoose.connect(process.env.DB_URI,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

//Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);


app.get('/', (req, res)=>{
    res.render('hello');
})

app.get('/about', (req,res)=>{
    res.render('about');
})

const PORT = process.env.PORT || 3000; // || = OR, && = AND

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`);
})