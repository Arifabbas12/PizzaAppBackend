
const AppError = require("./appError");

class UnAuthorizedError extends AppError{
    constructor() {
        // properties []

        super(`user is not authorized properly`, 401);
    }
}

module.exports = UnAuthorizedError;