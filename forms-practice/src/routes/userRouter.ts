import express from 'express';
import { userPostController,userGetController, updateGetController, updatePostController, deletePostController, searchGetController, searchPostController } from '../controllers/userController';
import { Request,Response,NextFunction } from 'express';
import { validateUser } from '../middleware/validateUser';


const userRouter = express.Router();

userRouter.get("/",userGetController);


userRouter.get("/create",(req:Request,res:Response,next:NextFunction)=>{
    try{
        res.render('createUser',{title: "Create User"})
    }catch(error){
        next(error)
    }
})
userRouter.post("/create",validateUser,userPostController);


// update
userRouter.get("/update/:userName",updateGetController)
userRouter.post("/update/:userName",validateUser,updatePostController)

// delete
userRouter.post('/delete/:userName',deletePostController)

// search
userRouter.get('/search',searchGetController)
userRouter.post('/search',searchPostController)





export { userRouter }



