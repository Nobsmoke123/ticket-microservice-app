interface IAppErrorResponse {
    message: string[];
    code: number;
}

export default abstract class AppError extends Error {
    constructor(message: string, public statusCode: number){
        super(message);
        // Ensure the name property is set to the class name
        this.name = this.constructor.name;
        // Creates a stack trace property on the error instance
        Error.captureStackTrace(this, this.constructor);
    }

   abstract serializeError(): IAppErrorResponse[];
}