import { IBook, IFeed, IReview, IUser } from "../models/Ifeeds";


export const feed = async (book: any, user: any, review: any) => {
    let feeds: any = {}
    feeds.data = []
    console.log(book, user, review, "we are in logic side")
    book.forEach((bookObj: any) => {
        let feed: any = {};
        const ArrayIReview: any[] = [];
        const bookO: IBook = {
            bookName: bookObj.bookName,
            authorName: bookObj.authorName,
            pages: bookObj.pages,
            description: bookObj.description,
            id: bookObj.id,
            bookImage: bookObj.bookImage,
            authorId: bookObj.authorId,
        }
        feed.bookData = bookO;
        user.forEach((userObj: any) => {
            const userO: IUser = {
                id: userObj.id,
                firstname: userObj.firstname,
                lastname: userObj.lastname
            }
            feed.authorData = userO;
            if (userObj.id === bookObj.authorId) {
                review.forEach((reviewObj: any) => {
                    if (reviewObj[0] === []) {
                        ArrayIReview.push([]);
                        feed.reviewData = ArrayIReview;
                    }
                    if (reviewObj[0] !== [] || reviewObj[0].bookId === bookObj.id) {
                        console.log(reviewObj,"reviewObj")
                       
                            const reviewO: IReview = {
                                description: reviewObj.description,
                                bookId: reviewObj.bookId,
                                reviewerName: reviewObj.reviewerName,
                                reviewId: reviewObj.reviewId,
                                reviewerDetails: {
                                    id: reviewObj.reviewerDetails.id,
                                    firstname: reviewObj.reviewerDetails.firstname,
                                    lastname: reviewObj.reviewerDetails.lastname
                                }
                            }
                            ArrayIReview.push(reviewO)
                        
                        feed.reviewData = ArrayIReview;

                    }
                });
            }

        });
        const feedO: IFeed = {
            author: feed.authorData,
            book: feed.bookData,
            reviews: feed.reviewData
        }
        feeds.data.push(feedO)
    });
    return feeds
}