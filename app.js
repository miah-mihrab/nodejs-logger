const fs = require('fs')
const logger = require('./utils/logger');
const cors = require('cors')
const express = require('express');
const app = express();
const asyncErrorHandler = require('./utils/asyncErrorHandler');
const mongoose = require('mongoose');
const moment = require('moment');
const handlers = require('./utils/handlers');
app.use(cors('*'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// asyncErrorHandler
// mongoose.connect('mongodb://127.0.0.1:27017/logger', { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {
//     console.log(err)
// });
// mongoose.connection.close()
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// asyncErrorHandler((kitty.save().then(() => console.log('meow'))));


// ERRORS
process.on('uncaughtException', (exception) => {
    let err = {};
    err['errorMessage'] = exception.message + "(UncaughtException)";
    err['stackTrace'] = exception.stack;
    err['timestamp'] = moment().format('MMMM Do YYYY, h:mm:ss a')
    if (!fs.existsSync('error.log')) {
        fs.writeFile('error.log');
    }
    fs.appendFile('error.log', `${Buffer.from(JSON.stringify(err)).toString('base64')}, `, (err) => {
        if (!err) console.log('saved');
    })


})
process.on('unhandledRejection', (exception) => {
    let err = {};
    err['errorMessage'] = exception.message + "(UnhandledRejection)";
    err['stackTrace'] = exception.stack;
    err['timestamp'] = moment().format('MMMM Do YYYY, h:mm:ss a')
    if (!fs.existsSync('error.log')) {
        fs.writeFile('error.log');
    }
    fs.appendFile('error.log', `${Buffer.from(JSON.stringify(err)).toString('base64')}, `, (err) => {
        if (!err) console.log('saved');
    })
})
// ERRORS END


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Unhandled exception
// throw new Error("Something went wrong on startup")

// Unhandled promise rejection
// const promiseTest = Promise.reject(new Error('Failed promise'))
// promiseTest.then(() => console.log('done'))

app.get('', (req, res, next) => {
    handlers({ level: 'warning', errorMessage: 'This is a warning' }, req, res);
})

app.post('', asyncErrorHandler((async (req, res, next) => {
    throw new Error('Error occured')
})))


app.get('/errors', (req, res) => {
    let str = fs.readFileSync('./error.log')
    let err = str.toString();
    res.send(err)
});

app.use(require('./middleware/globalError'));

app.listen(8080, console.log("Server up and running"));