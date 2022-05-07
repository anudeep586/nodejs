import axios from "axios";
import { aError } from "../errorHandlers/CustomError";


export const book = async (token: string, page: number, limit: number) => {
  if (!token) {
    throw new aError('Token should not be empty', 403)
  }
  let bookArray: any[] = []
  await axios.get(`http://localhost:3030/book/page/${page}/${limit}`, {
    headers: {
      'token': `bearer ${token}`
    }
  }).then((resp: any) => {
    bookArray.push(resp.data)
  });
  return bookArray[0]
}

