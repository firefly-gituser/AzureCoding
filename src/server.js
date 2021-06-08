const express = require('express');
const app = express();
const host = `http://localhost`
app.listen(80,()=>console.log(`Running in ${host}`))

app.get('/',(req,res)=>{
    res.send('<h1> Hello </h1>')
})