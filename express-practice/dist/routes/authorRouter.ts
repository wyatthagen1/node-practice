import Router, { response } from "express";
import { Request,Response,NextFunction } from "express";
import { getAuthorController, getAllAuthors } from "../controllers/authorController.js";

const authorRouter = Router();
authorRouter.get('/', getAllAuthors)
authorRouter.get('/:authorId', getAuthorController);


export {authorRouter}