import Router, { response } from "express";
import { Request,Response,NextFunction } from "express";
import path from "path";
import { getMessageController, createMessageController } from "../controllers/messageController.js";

const messageRouter = Router(); 

// Define Routes
messageRouter.get('/',(req:Request,res:Response, next:NextFunction) => {
    try{
        res.render('form')
    }catch(err){
        next(err)
    }
})

messageRouter.post('/',createMessageController)

export {messageRouter}