import {_book} from "./bookService";
import {notFoundError } from "../errorHandlers/CustomError";
import { v4 as uuidv4 } from 'uuid';
import _user from "../controllers/user";
import { review } from "../models/review";

export const _review: review[] = [];




export const createReviewService=(userId:string,bookId:string,review:any)=>{
    const index = _book.filter(t =>t.id===bookId);
        console.log(_book,bookId,userId,"hello")
        if (index ===[]) {
            console.log("index",index,_book)
            throw new notFoundError("Wrong credentials", 400)
        }
        else {
            review.reviewId = uuidv4();
            review.bookId = bookId;
            review.userId = userId;
            const rev=_user.find(obj=>obj.id===userId)
            review.reviewerName=rev.firstname;
            _review.push(review)
            console.log(review, _review)
            return review
        }
}

export const getAllReviewsService=(userId:string,bookId:string)=>{
    const index = _user.filter(t => t.id === userId);
        console.log(index)
        if (index === []) {
            throw new notFoundError("Wrong credentials", 404)
        }
        else {
            const Allresults = _review.filter(obj => obj.bookId === bookId)
            console.log(Allresults, _review, userId, bookId)
            return Allresults
        }
}

export const updateReviewService=(userId:string,reviewId:string,reviewbody:any)=>{
    const updateReview = _review.find(obj =>obj.reviewId === reviewId && obj.userId === userId
    )
    console.log(updateReview)
    if (updateReview === undefined) {
        throw new notFoundError("Wrong credentials", 400)
    }
    else {
        updateReview.description = reviewbody.description;
        return updateReview
    }
}

export const deleteReviewService=(userId:string,bookId:string,reviewId:string)=>{
    const index = _review.findIndex(obj => obj.bookId === bookId && obj.reviewId === reviewId && obj.userId === userId)
        if (index === -1) {
            throw new notFoundError("Wrong credentials", 404)
        }
        else {
            _review.splice(index, 1)
            console.log(_review)
            return reviewId
        }
}




export const gettingReviewsService=(data:any)=>{
    let reviews:any={}
    data.forEach((bookId: any)=>{
        const data1=_review.filter(obj=>{
            if(obj.bookId===bookId){
                const data2=_user.find(objInside=>objInside.id===obj.userId)
                console.log(bookId,data1,data2)
            }
        })
    })
}


export const getReviewByIdService=(userId:string,bookId:string,reviewId:string)=>{
    const review = _review.find(obj => obj.bookId === bookId && obj.reviewId === reviewId && obj.userId === userId)
        if (review === undefined) {
            throw new notFoundError("Wrong credentials", 404)
        }
        else {
            
            return review
        }
}