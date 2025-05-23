import winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'combiled.log', level: 'info'}),
    ]
});

if(process.env.NODE_ENV !== "production"){
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.simple()
        ),
    }));
}

export default logger;