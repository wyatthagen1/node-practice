import { Request,Response,NextFunction } from "express";
import { userSchema, user } from "../schemas/userSchema";
import { userContext } from "../schemas/userSchema";


export async function validateUser(req:Request, res: Response, next:NextFunction){
    try{
        const result = userSchema.safeParse(req.body);
        if(!result.success){
            res.status(404).send(`Invalid user Request: ${result.error}`);
        }
        else{
        const context: userContext = { user: result.data }
        res.locals.context = context
        next()
        }
    }catch(error){
        next(error)
    }
}