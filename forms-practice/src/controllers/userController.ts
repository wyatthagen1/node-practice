import { Request,Response,NextFunction } from "express";
import { user, userSchema } from "../schemas/userSchema";
import { postUser, getUser , updateUser, getAllUsers, deleteUser } from "../storages/db";

export async function userPostController(req:Request, res:Response, next:NextFunction){
    try{
        if(!res.locals.context){
            res.status(404).send('New User data not found')
        }
        const newUser = res.locals.context.user;
        await postUser(newUser)
        const users = await getAllUsers();
        res.locals.users = users;
        res.render('index', {title: "All Users"})

    }catch(error){
        console.log(error)
        next(error)
    }
}

export async function userGetController(req:Request, res:Response, next:NextFunction) {
    try{
        const users = await getAllUsers();
        res.locals.users = users
        res.render('index',{title: "All Users", users: users})

    }catch(error){
        console.log(error)
        next(error)
    }
}

export async function updateGetController(req:Request,res:Response, next:NextFunction) {

    const userName: string = req.params.userName;
    console.log(userName)
    try{
        const fetchd = await getUser(userName,'name');
        if(!fetchd){
            res.status(404).send("User Not Found when trying to update")
        }else{
        res.render('updateUser',{user:fetchd , title:`Update ${fetchd.name}`})
        }
    }catch(error){
        next(error)
    }
}

export async function updatePostController(req:Request,res:Response,next:NextFunction){

    try{
        const userName: string = req.params.userName;
        const user: user = res.locals.context.user;
        console.log(`User: ${user}, Username: ${userName}`)
        if(!user){
            res.status(404).send("Updated User data not found")
        }

        await updateUser(userName,user)
        res.redirect('/')

    }catch(error){
        next(error)
    }
}

export async function deletePostController(req:Request, res:Response, next:NextFunction){
    try{
        const name = req.params.userName;
        if(!name){
            res.status(404).send("Username is required in order to initiate a deletion request")
        }
        deleteUser(name)
        res.redirect('/')

    }catch(error){
        next(error)
    }
}


export async function userUpdateController(req:Request, res:Response, next:NextFunction) {
    try{
        const updatedUser = userSchema.parse(req.body);
        const user = await getUser(updatedUser.name, 'name');

        if(!user){
            res.status(404).render('index',{errors: "User Not Found"})
            throw new Error("User lookup failed")
        }

        await updateUser(user.name, updatedUser)
        res.render('index',{updatedUser: user})

    }catch(error){
        next(error)
    }
}

export async function searchGetController(req:Request,res:Response,next:NextFunction){
    try{
        res.render('search',{title:"Search for an user!"});
    }catch(error){
        next(error)
    }
}

export async function searchPostController(req:Request,res:Response,next:NextFunction){
    let searchProp: 'name' | 'email' | null = null;
    if (req.body.name){
        searchProp = 'name';
    }else if(req.body.email){
        searchProp = 'email';
    }else{
        searchProp = null
    }

    try{
        if(!searchProp){
            res.status(404).render('index',{errors: "Not enough information given about the user to complete search query"})
            return
        }
        const body = req.body
        const user = await getUser(body[searchProp],searchProp);
        if(!user){
            res.status(404).render('index',{errors: "User Not Found!"})
            return
        }
        res.locals.user = user
        res.render('search',{user:user, title:`Returned Results for ${user.name}`})

        
    }catch(error){
        next(error)
    }
}






