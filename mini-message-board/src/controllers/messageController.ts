import {Request, Response, NextFunction} from "express"; 
import { getMessages, pushMessage, MessageSchema } from "../models/db.js";


export async function getMessageController(req:Request, res:Response, next:NextFunction){
    // get messages 
    try{
        const messages = await getMessages();
        if(!messages){
            throw new Error("No Messages Found")
        }
        console.log(messages)
        res.render('index',{messages:messages});

    }catch(err){
        next(err)
    }
}

export async function createMessageController(req:Request, res:Response, next:NextFunction) {
    // create messages
    try{
        //parse + valdiate request
        req.body.added = new Date();
        const message  = MessageSchema.parse(req.body)
        console.log(message);
        pushMessage(message)
        res.redirect('../');

    }catch(err){
        next(err)
    }
}