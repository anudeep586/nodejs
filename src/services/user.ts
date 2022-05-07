import axios from "axios";
import { aError } from "../errorHandlers/CustomError";

export const user = async (token: string, authorIddata: any) => {
    const usersArray: any[] = []
    if (!token) {
        throw new aError('Token should not be empty', 403)
    }
    await axios.post('http://localhost:3030/usersDetails', authorIddata, {
        headers: {
            'token': `bearer ${token}`
        }
    }).then(async (resp: any) => {
        usersArray.push(resp.data)
    });
    return usersArray[0]

}


