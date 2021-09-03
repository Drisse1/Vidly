const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    })

    // winston.add(winston.transports.File, { filename: 'logfile.log' });
    // winston.add(winston.transports.MongoDB, {
    //     db: 'mongodb://localhost/vidlyTest',
    //     level: 'info'
    // });
}

// winston.configure({transports: [new winston.transports.File({ filename: 'logfile.log' }) ]});
// winston.configure({transports: [new winston.transports.MongoDB({
//     db: 'mongodb://localhost/vidlyTest',
//     level: 'info'
// }) ]});

// process.on('uncaughtException', (ex) => {
//     console.log('WE GOT AN UNCAUGHT EXCEPTION.');
//     winston.error(ex.message, ex);
// });


//throw new Error('Something failed during startup.');