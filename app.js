const winston = require('winston')
const fs = require('fs')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf-8')
const logger = require('./utils/logger');
const cors = require('cors')
const express = require('express');

const app = express();

const asyncErrorHandler = require('./utils/asyncErrorHandler');
const exphbs = require('express-handlebars')
app.use(cors('*'))
const mongoose = require('mongoose');
// asyncErrorHandler
// mongoose.connect('mongodb://127.0.0.1:27017/logger', { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {
//     console.log(err)
// });
// mongoose.connection.close()
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// asyncErrorHandler((kitty.save().then(() => console.log('meow'))));

// ERRORS
process.on('uncaughtException', (exp) => {
    logger.error('', exp);
})
process.on('unhandledRejection', (exp) => {
    logger.error('', exp)
})
// ERRORS END

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set View Engine
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Unhandled exception
// throw new Error("Something went wrong on startup")

// Unhandled promise rejection
// const promiseTest = Promise.reject(new Error('Failed promise'))
// promiseTest.then(() => console.log('done'))

app.get('', (req, res, next) => {
    res.send("Working")
})

app.post('', asyncErrorHandler((async (req, res, next) => {
    throw new Error('Error occured')
})))


app.get('/errors', (req, res) => {
    let str = fs.readFileSync('./error.json')
    let err = str.toString()
    // console.log(strCopy)
    res.send(err)
    // res.render('errors', { errors: err })

    //res.send(strCopy)
});
// app.get('/errors-log', (req, res) => {
//     res.render('errors')
// })
app.use(require('./middleware/globalError'));

app.listen(8080, console.log("Server up and running"));