import Router, { response } from "express";
import { Request,Response,NextFunction } from "express";
import path from "path";
import { MessageSchema } from "../models/db.js";


const messageViewRouter = Router(); 

// Define Routes
messageViewRouter.get('/',(req:Request,res:Response, next:NextFunction) => {
    try{
        console.log("----------- Request Query -----------")
        console.log(req.query)
        if(!req.query){
            throw new Error('No Message Found')
        }
        const messageRaw = req.query
        const added = new Date(String(messageRaw.added));
        const user = String(messageRaw.user);
        const text = String(messageRaw.text);

        const message = MessageSchema.parse({added:added, user:user, text:text})
        res.render('message-view',{message:message})
    }catch(err){
        next(err)
    }
})


export {messageViewRouter}