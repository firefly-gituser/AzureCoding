const home = require('./home')

const product = require('./product')
const route = (app)=>{
   
    app.use('/home',home);
    app.use('/product',product)
    app.use('/',(req,res)=>{
        res.render('landing')
    })
}

module.exports = route