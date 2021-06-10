/** LIBBRARY*/
const express = require('express');
const hbs = require('express-handlebars');
const sass = require('node-sass-middleware')
/**INJECTION */
const route = require('./route')

const app =  express();

var port = process.env.PORT || 3000
var url = `http://localhost:${port}`
app.listen(port,()=>console.log(`Running in ${url} !`));



app.set('views',__dirname+'/resources/views')
app.set('view engine','html')
app.engine('html',hbs({extname:'html',defaultLayout:'main'}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(sass({
    src:__dirname+'/resources/',
    dest: __dirname+'/public/',
}))

app.use(express.static(__dirname+'/public/'));
//-------------------
var fs = require('fs');
var dir = __dirname+'/tmp';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
//-------------------
route(app);
