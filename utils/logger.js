const winston = require('winston')
const NODE_ENV = process.env.NODE_ENV;
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        // winston.format.prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },

    transports: [
        new winston.transports.File({ filename: 'error.txt', level: 'info' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

if (NODE_ENV != 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
module.exports = logger;