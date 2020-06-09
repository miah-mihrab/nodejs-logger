const logger = require('../utils/logger');
const winston = require('winston/lib/winston/config');
module.exports = function (err, req, res, next) {
    // winston.error(err.message, err)
    logger.error('', err)
    console.log(err.message)
    res.status(500).send("Something went wrong")
}