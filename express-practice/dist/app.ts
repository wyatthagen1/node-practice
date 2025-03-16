import express from "express";
import { Request,Response, NextFunction } from "express";
import { CustomNotFoundError } from "./errors/CustomNotFoundError.js";
import { authorRouter } from "./routes/authorRouter.js";
import path from "node:path";



// data 
const links = [
    { href:"/", text: "Home" },
    { href: "/authors", text: "Authors"}
];

const users = ['Bobby','Babyboi','Captaincum']


const app = express(); 
const port = 3000;

app.set("views", path.join( __dirname, "views"));
app.set("view engine","ejs");
app.locals.viewsDir = path.join(__dirname, 'views');



app.use((req, res, next) => {
    if (req.app.get('views') !== app.locals.viewsDir) {
        console.log('Views path was changed! Restoring...');
        req.app.set('views', app.locals.viewsDir);
    }
    next();
});




app.get('/',(req:Request,res:Response,next:NextFunction)=> {
    res.render(
        "index",
        {links:links, users:users}
    )
})
app.use('/authors',authorRouter)




app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof CustomNotFoundError){
       res.status(404).json(err.message)
    }
    console.log(err)
    res.status(500).send(err);
})

app.listen(port, ()=>console.log(`Listening on http://localhost:${port}`))

