
class CustomNotFoundError extends Error{
    statusCode: number;
    name: string;

    constructor(message:any){
        super(message);
        this.statusCode = 400
        this.name = "NotFoundError"
    }
}

export {CustomNotFoundError}