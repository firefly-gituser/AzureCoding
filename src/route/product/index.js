const route = require('express').Router()

route.get('/',(req,res)=>{
    res.send('PRODUCT ROUTE')
})
module.exports = route