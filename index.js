const express = require('express');
const app =  express()

app.listen(3000,()=>console.log("Running....!"));

app.get('/',(req,res)=>{
    res.send('Hello World')
})