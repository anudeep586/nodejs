import _user from "./user";
import { _book } from '../services/bookService';
import { createReviewService, deleteReviewService, getAllReviewsService, getReviewByIdService, gettingReviewsService, updateReviewService } from '../services/reviewServices';

export const createReview=(ctx: any)=>{
    try {
        console.log("it's getting")
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const review = ctx.request.body;
        console.log(userId,bookId,review,"controller")
        const ReviewCreated = createReviewService(userId, bookId, review)
        ctx.status = 202;
        ctx.body = ReviewCreated
    }
    catch (err: any) {
        console.log("cool1")
        ctx.status = err.status;
        ctx.body = err.message;
    }
}

export const getAllReviews=(ctx: any)=> {
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const Reviews = getAllReviewsService(userId, bookId)
        ctx.status = 200;
        ctx.body = Reviews;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message
    }
}

export const updateReview=(ctx: any)=>{
    try {
        const userId = ctx.state.userPayload.id;
        const reviewId = ctx.request.params.reviewId;
        const reviewbody = ctx.request.body;
        const updatedReview = updateReviewService(userId, reviewId, reviewbody)
        ctx.status = 202;
        ctx.body = updatedReview;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message
    }

}
export const deleteReview=(ctx: any)=>{
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const reviewId = ctx.request.params.reviewId;
        const deletedReviewId = deleteReviewService(userId, bookId, reviewId)
        ctx.status = 202;
        ctx.body = deletedReviewId;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message
    }
}

export const getReviewById=(ctx:any)=>{
    try{
        console.log("helo")
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const reviewId = ctx.request.params.reviewId;
        console.log(userId,bookId,reviewId,"entering")
        const  getReviewById= getReviewByIdService(userId, bookId, reviewId)
        ctx.status = 202;
        ctx.body = getReviewById;
    }
    catch(err){
        ctx.status = err.status;
        ctx.body = err.message
    }
    
}


