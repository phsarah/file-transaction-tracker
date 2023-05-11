export default class CustomError extends Error {
    public location: string;
    public method: string;
    public httpStatusCode: number;
    public internalCode: number;
    public ignore: boolean;
    public details?: any;

    constructor(
        location: string,
        method: string,
        message = 'Internal server error',
        httpStatusCode = 500,
        internalCode = 0,
        ignore = false,
        details: any = null,
    ) {
        super();
        this.name = 'CustomError';
        this.message = message;
        this.location = location;
        this.method = method;
        this.httpStatusCode = httpStatusCode;
        this.internalCode = internalCode;
        this.ignore = ignore;
        this.details = details;
    }

    toJSON() {
        return {
            error: {
                name: this.name,
                message: this.message,
                internalCode: this.internalCode,
                ignore: this.ignore,
                stacktrace: process.env.NODE_ENV === 'development' ? this.stack : null,
            },
        };
    }
}