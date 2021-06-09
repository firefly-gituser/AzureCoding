const route = require('express').Router()

const home = require('./home')
route.use('/',home)
module.exports = route