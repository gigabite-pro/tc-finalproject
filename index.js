const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

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