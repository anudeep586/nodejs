import _user from "../controllers/user";
import { notFoundError } from "../errorHandlers/CustomError";
import { v4 as uuidv4 } from 'uuid';
import { Book } from "../models/book";

export const _book: Book[] = [];

export const createBookService = (userId: string, book: any) => {
    const index = _user.find(t => t.id === userId);
    if (index === undefined) {
        throw new notFoundError("Wrong credentials", 400)
    }
    else {
        book.id = uuidv4();
        book.authorId = userId;
        console.log(userId, book.authorId, "created book")
        console.log(book)
        _book.push(book)

        return book
    }
}

export const getAllSearchResultService = (userId: string, firstname: string) => {
    const searchingAllBooks = _user.find(obj => obj.id === userId)
    console.log(_user,userId,"4041")
    if (searchingAllBooks ===undefined) {
        throw new notFoundError("Wrong credentials", 404)
    }
    else {
        const titleresults = _book.filter(obj => obj.bookName.includes(firstname))
        console.log(titleresults, searchingAllBooks)
        return titleresults
    }
}

export const getAllBooksService = (UserId: string) => {
    const index = _user.find(t => t.id === UserId);
    if (index ===undefined) {
        throw new notFoundError("Wrong credentials ello", 404)
    }
    else {
        return _book
    }
}

export const getBookService = (userId: string, bookId: string) => {
    const index = _user.find(t => t.id === userId);
    if (index === undefined) {
        throw new notFoundError("Wrong credentials", 404)

    } else {
        const getbookid = _book.find(obj => obj.id === bookId)
        if(getbookid===undefined){
            throw new notFoundError("Not Found", 404)
        }
        else{
        return getbookid
    }}
}

export const deleteBookService = (userId: string, bookId: string) => {
    const index = _user.find(t => t.id === userId);
    if (index === undefined) {
        throw new notFoundError("Not found", 404)
    }
    else {
        const index = _book.findIndex(obj => obj.id === bookId)
        const deleted = _book[index];
        _book.splice(index, 1)
        return deleted
    }
}

export const updateBookService = (book: any, userId: string, bookId: string) => {
    const index = _user.find(t => t.id === userId);
    if (index === undefined) {
        throw new notFoundError("Wrong credentials", 404)
    }
    else {
        const Updateuser = _book.filter(obj => obj.id === bookId)[0]
        Updateuser.bookName = book.bookName;
        Updateuser.authorName = book.authorName;
        Updateuser.description = book.description;
        Updateuser.pages = book.pages;
        return Updateuser
    }
}

export const getAllBooksByPageService=(pageNo:number,limitNo:number,userId:string)=>{
    const index = _user.find(t => t.id === userId);
    if (index === undefined) {
        throw new notFoundError("Wrong credentials", 404)
    }
   const paging=(pageNo-1)*limitNo;
   console.log(_book.slice(paging,paging+limitNo),"paging book")
   return _book.slice(paging,paging+limitNo)
}