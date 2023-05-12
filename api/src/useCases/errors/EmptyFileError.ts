import CustomError from "../../../src/utils/customError";

export class EmptyFileError extends CustomError {
    constructor(location: string, method: string) {
        super(location, method);

        this.name = 'EmptyFileError';
        this.message = 'The file is empty or has no content';
        this.httpStatusCode = 422;
        this.internalCode = 15;
    }
}