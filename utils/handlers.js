let fs = require('fs');
let moment = require('moment');
module.exports = function (err, req, res) {

    err['requestIP'] = req.ip;
    err['timestamp'] = moment().format('MMMM Do YYYY, h:mm:ss a');
    err['method'] = req.method;
    fs.appendFile('error.log', `${Buffer.from(JSON.stringify(err)).toString('base64')}, `, (err) => {
        if (!err) console.log('saved');
    })
}