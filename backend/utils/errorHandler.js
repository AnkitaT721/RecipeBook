class ErrorHandler extends Error {  //inherited ErrorHandler from the default class Error in node
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;