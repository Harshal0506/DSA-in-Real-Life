const express=require('express');
const app=express();
const bodyParser = require("body-parser");
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.render('index');
  
});



app.use('/',express.static(__dirname+'/public'));

const PORT=process.env.PORT ||3000;


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})