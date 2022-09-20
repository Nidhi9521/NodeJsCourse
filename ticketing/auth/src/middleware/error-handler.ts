import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof RequestValidationError){
        console.log('handling this error as validation error');
        return res.status(err.statusCode).send({errors:err.serializeError()})
    }

    if(err instanceof DatabaseConnectionError){
        console.log("handling this error as DBerror");
        return res.status(err.statusCode).send({errors:err.serializeError()})
    }

    console.log('Something went wrong', err);
    res.status(400).send({
        message: 'Something went wrong'
    })

}