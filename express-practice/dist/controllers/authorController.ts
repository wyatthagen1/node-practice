import {Request, Response, NextFunction} from "express"; 
import { getAuthorById, allAuthors } from "../db.js";
import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";

console.log("Environment variables:", {
    NODE_PATH: process.env.NODE_PATH,
    PWD: process.env.PWD,
});

async function getAuthorController(req:Request ,res:Response, next: NextFunction){
    try{
        const { authorId } = req.params; 

        const author = await getAuthorById(Number(authorId))
        if (!author) {
            throw new CustomNotFoundError("Author Not Found");
        }
        res.send(`Author Name: ${author.name}`)

    }catch(error){
        next(error)
    }
}

async function getAllAuthors(req:Request,res:Response,next:NextFunction){
    try{
        const authors = await allAuthors();
        console.log(authors)
        if(!authors){
            throw new CustomNotFoundError("Author Not Found");
        }
        // In getAllAuthors function
        console.log("About to render from req app views path:", req.app.get('views'));
        res.render("authors",{authors:authors})

    }catch(error){
        next(error)
    }
    
}

export {getAuthorController,getAllAuthors}