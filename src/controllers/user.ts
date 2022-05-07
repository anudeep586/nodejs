import koa = require("koa");
import { User } from "../models/user";
import {  _review } from "../services/reviewServices";
import { createUserService, deleteUserService, gettingReviewsService, getUserDetailsService, getUserService, loginService, updateUserService } from "../services/userService";


const _user: User[] = []


export const createUser = (ctx: koa.Context) => {
    try {
        const user = <User>ctx.request.body;
        const newUser = createUserService(user)
        console.log(newUser);
        ctx.status = 202;
        ctx.body = newUser;
    } catch (err) {
        ctx.status = 400;
        ctx.body = "Bad request";
    }
}
export const getAllUsers = (ctx: any) => {
    try {
        ctx.status = 201;
        ctx.body = _user;
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }
}
export const getUser = (ctx: any) => {
    try {
        const userId = ctx.request.params.id;
        const getUserById = getUserService(userId)
        console.log(getUserById);
        ctx.status = 201;
        ctx.body = getUserById;
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }
}
export const updateUser = (ctx: any) => {
    try {
        const userId = ctx.request.params.id;
        const user = ctx.request.body;
        const UpdatingUser = updateUserService(user, userId);
        ctx.status = 201;
        ctx.body = UpdatingUser;
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }

}
export const deleteUser = (ctx: any) => {
    try {
        const userId = ctx.request.params.id;
        const deleteUserr = deleteUserService(userId);
        ctx.status = 201;
        ctx.body = deleteUserr;
    }
    catch (err) {
        ctx.status = 404;
        ctx.body = "Not found";
    }
}

export const login = (ctx: any) => {
    try {
        const mail = ctx.request.body.mail;
        const password = ctx.request.body.password;

        const generatedToken = loginService(mail, password)
        
        ctx.status = 202;
        ctx.body = generatedToken;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }



}

export const getFeeds=(ctx:any)=>{
   try{
    ctx.status=200
    ctx.body=_review
   }
   catch(err){
       ctx.status=404;
       ctx.body="Not found"
   }
}
export const getUserDetails=async (ctx:any)=>{
    try{
        console.log("entering")
        const getUserDeta=await getUserDetailsService(ctx.request.body)
        console.log(getUserDeta,"getUserdeta",ctx.request.body)
        ctx.status=200
        ctx.body=getUserDeta;
    }
    catch(err){
        ctx.status=404;
        ctx.body="Not found"
    }
}
export const gettingReviews=(ctx:any)=>{
    try{
        console.log("its getting in to controllers")
        const reviews=gettingReviewsService(ctx.request.body)
        ctx.status=200;
        ctx.body=reviews;
    }
    catch(err){
        ctx.status = 404;
        ctx.body = "Not found"
    }
}
export default _user