const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams) {
        // invalidParams []

        let message = " ";
        invalidParams.forEach(Params => message += `${Params}\n`);

        super(`The request has the following invalid parameters\n ${invalidParams}`, 400);
    }
}

module.exports = BadRequestError;