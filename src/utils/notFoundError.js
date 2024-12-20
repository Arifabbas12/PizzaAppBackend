const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor( resource) {
        // properties []

        super(`not able to find ${resource}`, 404);
    }
}

module.exports = NotFoundError;