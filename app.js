const fs = require('fs')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf-8')
const logger = require('./utils/logger');

const express = require('express');

const app = express();

const asyncErrorHandler = require('./utils/asyncErrorHandler');

const stripBomBuffer = require('strip-bom-buf');
const stripBom = require('strip-bom');

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
    let str = fs.readFileSync('./error.txt')
    res.send(str.toString().split('}'))
    // fs.readFile('./error.log', (err, buf) => {
    //     console.log(err)
    //     let str = "{'a':'b'} {'c':'d'}"
    //     let errors = buf.toString().replace("\\n", '').replace('{', '').split('}')
    //     for (let i = 0; i < errors.length; i++) {
    //         for (let j = 0; j < errors[i].length; j++) {
    //             // console.log(errors[i][j])
    //             if (errors[i][j] === '\\') {
    //                 errors[i][j] = 'a'
    //                 console.log(errors[i][j])
    //             }
    //         }
    //     }
    //     res.send(errors)
    // })


    // res.json(errors.toString('utf-8'))
    // res.send(JSON.parse(new String(errors.toStrisng('utf-8')).toString()))
    // res.send(JSON.stringify(errors));
})
app.use(require('./middleware/globalError'));

app.listen(8080, console.log("Server up and running"));