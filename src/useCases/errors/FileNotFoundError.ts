import CustomError from "../../utils/customError";

export class FileNotFoundError extends CustomError {
    constructor(location: string, method: string) {
        super(location, method);

        this.name = 'FileNotFoundError';
        this.message = 'Valide your params, txt file is missing';
        this.httpStatusCode = 422;
        this.internalCode = 15;
    }
}