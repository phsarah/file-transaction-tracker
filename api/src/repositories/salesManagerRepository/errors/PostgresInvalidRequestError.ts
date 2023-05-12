import CustomError from "../../../utils/customError";

export class PostgresInvalidRequestError extends CustomError {
    constructor(location: string, method: string) {
        super(location, method);

        this.name = 'PostgresInvalidRequestError';
        this.message = 'Invalid request for postgres database';
        this.httpStatusCode = 400;
        this.internalCode = 5;
    }
}