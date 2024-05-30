const express = require ('express')

// Config
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)
const app = express()


// DEPENDENCIES
const methodOverride = require('method-override')
const mongoose = require('mongoose')


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})


// Breads
const breadsController = require('./controllers/breads_controllers')
app.use('/breads', breadsController)


// Bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)



// 404 Page
app.get('*', (req, res) => {
    res.send('404')
})


mongoose.connect(process.env.MONGO_URI)


// Listen
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

module.exports = app;