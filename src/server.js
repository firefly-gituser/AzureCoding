const express = require('express');
const app =  express();
const hbs = require('express-handlebars');
var port = process.env.PORT || 3000
var url = `http://localhost:${port}`
app.listen(port,()=>console.log(`Running in ${url}!`));

app.use(express.static(__dirname+'/resources/public/'));

app.set('views',__dirname+'/resources/views')
app.set('view engine','html')
app.engine('html',hbs({extname:'html',defaultLayout:'main'}))

app.get('/',(req,res)=>{
   res.render('index')
})