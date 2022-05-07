import _user from "./user";
// import koa from "koa"
import { createBookService, deleteBookService, getAllBooksByPageService, getAllBooksService, getAllSearchResultService, getBookService, updateBookService } from "../services/bookService";
import koa = require("koa");



export const createBooks=(ctx:koa.Context) =>{
    try {
        const userId = ctx.state.userPayload.id;
        const book = ctx.request.body;
        const newBook = createBookService(userId, book)
        ctx.status = 201;
        ctx.body = newBook;
    } catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}
export const getAllSearchResult=(ctx: koa.Context)=> {
    try {
        const userId = ctx.state.userPayload.id;
        const firstname = ctx.request.query.query;
        console.log("ssdf")
        const SearchResult = getAllSearchResultService(userId, String(firstname))
        ctx.status = 200;
        ctx.body = SearchResult;
    }
    catch (err) {
        ctx.status = err.status;
        ctx.body = err.message;
    }
}

export const getAllBooks = (ctx: koa.Context) => {
    try {
        const UserId = ctx.state.userPayload.id;
        const AllBooksById = getAllBooksService(UserId)
        ctx.status = 200;
        ctx.body = AllBooksById
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}

export const getBook = (ctx: koa.Context) => {
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.params.bookId;
        const fetchedBook = getBookService(userId, bookId)
        ctx.status = 200;
        ctx.body = fetchedBook
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}
export const deleteBook = (ctx: any) => {
    try {
        const userId = ctx.state.userPayload.id;
        const bookId = ctx.request.params.bookId;
        const deletedBook = deleteBookService(userId, bookId)
        ctx.status = 202;
        ctx.body = deletedBook
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}
export const updateBook = (ctx: any) => {
    try {
        const userId = ctx.state.userPayload.id;
        const book = ctx.request.body;
        const bookId = ctx.request.params.bookId
        const updatedBook = updateBookService(book, userId, bookId)
        ctx.status = 202;
        ctx.body = updatedBook;
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}
export const getAllBooksBYPage=(ctx:any)=>{
    try {
        const pageNo=ctx.request.params.pageNo;
        const limitNo=ctx.request.params.limitNo
        const userId = ctx.state.userPayload.id;
        const AllBooksById = getAllBooksByPageService(pageNo,limitNo,userId)
        console.log("book",AllBooksById)
        ctx.status = 200;
        ctx.body = AllBooksById
    }
    catch (err) {
        ctx.status = err.status
        ctx.body = err.message;
    }
}