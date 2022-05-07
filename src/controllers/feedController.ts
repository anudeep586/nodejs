import { book } from "../services/book"
import { review } from "../services/review";
import { user } from "../services/user";
import { feed } from "../services/feedService"
import koa = require("koa");

export const getAllFeeds = async (ctx: koa.Context) => {
    try {
        let page: number;
        let limit: number;
        let token: string;
        if (ctx.request.query.page === undefined || ctx.request.query.limit === undefined) {
            page = 1;
            limit = 2;
        }
        else {
            page = Number(ctx.request.query.page);
            limit = Number(ctx.request.query.limit);
        }
        console.log("hello entering")
        if (ctx.request.header.token === undefined) {
            token = ""
        } else {
            token = (ctx.request.header.token as string).split(' ')[1]
        }
        console.log("12")
        const bookDetails = await book(token, page, limit);
        const userIds = bookDetails.map((obj: { authorId: string; }) => obj.authorId)
        const bookIds = bookDetails.map((obj: { id: string; }) => obj.id)
        const userData = await user(token, Array.from(new Set(userIds)));
        const reviewerDetails = await review(token, bookIds)
        console.log(reviewerDetails, userData, bookDetails, "123")
        const feeds = await feed(bookDetails, userData, reviewerDetails)
        ctx.body = feeds;
        ctx.status = 200;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}

