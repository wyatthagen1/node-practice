import express from "express";
import { Request,Response,NextFunction, } from "express";
import { user, userSchema } from "./schemas/userSchema";
import { userRouter } from "./routes/userRouter";
import { z } from 'zod'
import { renderOverload } from "./middleware/renderOverload";
import path from "path";

async function errorHandler(error: any, req:Request, res:Response, next:NextFunction){
    if(error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
        }));

        // Render the form again with error messages
        return res.status(400).render("index", { 
            errors: errorMessages,
            originalData: req.body, 
            title: "Error Page"
        });
    }
    console.log(error)
    res.status(500).send(error);
    
}

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(renderOverload);

// View engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use('/', userRouter)

app.use(errorHandler)

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));







