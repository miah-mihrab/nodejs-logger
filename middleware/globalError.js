const moment = require('moment');

const fs = require('fs');

module.exports = function (err, req, res, next) {

    err['params'] = req.body;
    err['errorMessage'] = err.message;
    err['timestamp'] = moment().format('MMMM Do YYYY, h:mm:ss a');
    err['stackTrace'] = err.stack;
    err['requestIP'] = req.ip;
    err['level'] = 'Error';
    err['method'] = req.method;

    if (!fs.existsSync('error.log')) {
        fs.writeFile('error.log');
    }

    fs.appendFile('error.log', `${Buffer.from(JSON.stringify(err)).toString('base64')}, `, (err) => {
        if (!err) console.log('saved');
    });

    res.status(500).send("Something went wrong")
}