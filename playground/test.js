// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let words = ['abc', 'defg', 'hij', 'klmno'];
// // console.log(words.length, Math.ceil(Math.random() * words.length))

// let word = words[Math.ceil(Math.random() * words.length)]
// console.log(word, word.length)
// let dash = '';
// for (let i = 0; i < word.length; i++) {
//     dash += '-'
//     if (i === word.length - 1) console.log(dash)
// }

// readline.question(`Guess character of the word: `, character => {
// })

const express = require('express');
const app = express();

const session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.listen(1312, console.log('Server up and running'))