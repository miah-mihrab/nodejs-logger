const winston = require('winston')
const NODE_ENV = process.env.NODE_ENV;

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
        // winston.format.splat(),
        // winston.format.simple()
        // winston.format.prettyPrint()

    ),
    // defaultMeta: { service: 'user-service' },

    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error', json: true }),
        new winston.transports.File({ filename: 'warning.log', level: 'warning', json: true })
    ]
})

if (NODE_ENV != 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
module.exports = logger;