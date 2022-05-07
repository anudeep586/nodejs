import * as Router from "koa-router";
import { createUser, deleteUser, getAllUsers, getFeeds, gettingReviews, getUser, getUserDetails, login, updateUser } from "../controllers/user";
import Joi = require("joi");
import { verifyToken } from "../middleware/verifyTokenMiddleware";


const userRouter = new Router();
const schema = Joi.object({

    firstname: Joi.string()
        .min(1)
        .max(300)
        .required(),
    lastname: Joi.string()
        .min(1)
        .max(300)
        .required(),
    mail: Joi.string()
        .min(1)
        .max(300)
        .required(),
    password: Joi.string()
        .min(1)
        .max(300)
        .required(),
})
const schemaForLogin=Joi.object({
    username: Joi.string()
        .min(1)
        .max(300)
        .required(),
    mail: Joi.string()
        .min(1)
        .max(300)
        .required(),
    password: Joi.string()
        .min(1)
        .max(300)
        .required(),
})
userRouter.post("/signup",(ctx:any,next:any)=>{
    const { error, value } = schema.validate(ctx.request.body)
    if(error){
        console.log(error)
        ctx.status=400;
        ctx.body="Invalid Input"
    }
    else{
        next()
    }
},createUser)
userRouter.get("/users", verifyToken,getAllUsers);
userRouter.get("/users/:id",verifyToken,getUser);
userRouter.put("/users/:id", verifyToken,updateUser);
userRouter.delete("/users/:id", verifyToken,deleteUser);
userRouter.post("/login",(ctx:any,next:any)=>{
    const { error, value } = schemaForLogin.validate(ctx.request.body)
    if(error){
        console.log(error)
        ctx.status=400;
        ctx.body="Invalid Input"
    }
    else{
        next()
    }
}, login);









userRouter.get("/getFeeds",getFeeds);
userRouter.post('/usersDetails',getUserDetails)
userRouter.post('/reviewDetails',gettingReviews)
export { userRouter };
