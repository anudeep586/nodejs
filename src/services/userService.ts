
import _user from "../controllers/user";
import { cError, notFoundError } from "../errorHandlers/CustomError";
import { User } from "../models/user";
import { _review } from "./reviewServices";


const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken');




export const createUserService = (user: any) => {
    user.id = uuidv4();
    const verifyingUser = _user.find(obj => obj.mail === user.mail && obj.password === user.password)
    if(verifyingUser!==undefined){
        throw new cError("User already there",409)
    }
    console.log(user)
    _user.push(user)
    const token = jwt.sign(user, "secret");
    console.log(_user)
    return user;
}

export const getUserService = (userId: string) => {
    const user = _user.find(t => t.id === userId);
    if (user == undefined) {
        throw new Error("Not found")
    }
    return user;
}

export const updateUserService = (user: any, userId: string) => {
    let updateUser = _user.filter(t => t.id === userId)[0];
    if (!updateUser) {

        throw new Error("Unauthorized")
    }
    updateUser.firstname = user.firstname;
    updateUser.lastname = user.lastname
    updateUser.mail = user.mail
    updateUser.password=user.password
    return updateUser;
}

export const deleteUserService = (userId: string) => {
    const index = _user.findIndex(t => t.id === userId);
    console.log(index, _user, userId)
    if (index === -1) {
        throw new notFoundError("Not found", 404)
    }
    const user = _user[index];
    _user.splice(index, 1);

    return user
}

export const loginService = (mail: string, password: string) => {
    const verifyingUser = _user.find(obj => obj.mail === mail && obj.password === password)
    console.log(_user, verifyingUser)
    if (verifyingUser === undefined) {
        // throw new MyError({ status: 401, message: 'UnAuthorized' });
        throw new notFoundError("UnAuthorized", 401)
    }
    else {
        const generatedToken = jwt.sign(verifyingUser, "secret")
        return generatedToken;
    }
}

export const getUserDetailsService = (data: any) => {
    let arrayUsers: any[] = [];
    console.log("data", data)
    const data1 = data.forEach((userid: any) => {
        const data1 = _user.find((userId: any) => userId.id === userid)
        console.log(data1, _user, userid, "72")
        arrayUsers.push(data1)
        console.log(arrayUsers)
    })

    console.log(arrayUsers, "arrayUsers")
    return arrayUsers;
}
export const gettingReviewsService = (data: any) => {
    // data = ['67345181-44a4-4de6-88d5-f957733932ad']
    // _review.push({
    //     description: ' hello book for dsa',
    //     reviewId: '3ee444a7-4e66-45b4-9576-10d360b9b24b',
    //     bookId: '67345181-44a4-4de6-88d5-f957733932ad',
    //     userId: 'd6a95755-5f8c-4a1e-b02b-7274ac531706',
    //     reviewerName: 'Anudeeps Naga'
    // },{
    //     description: ' cool book for dsa',
    //     reviewId: '3ee444a7-4e66-45b4-9576-10d360b9b24b',
    //     bookId: '67345181-44a4-4de6-88d5-f957733932ad',
    //     userId: 'd6a95755-5f8c-4a1e-b02b-7274ac531706',
    //     reviewerName: 'Anudeeps Naga'
    // },{
    //     description: ' nice book for dsa',
    //     reviewId: '3ed444a7-4e66-45b4-9576-10d360b9b24b',
    //     bookId: '67345181-44a4-4de6-88d5-f957733932ad',
    //     userId: 'd6a95755-5f8c-4a1e-b02b-7274ac531706',
    //     reviewerName: 'Anudeeps Naga'
    // })
    // _user.push({
    //     firstname: 'Anudeeps Naga',
    //     lastname: 'lakanavarapu',
    //     mail: 'anudeep4n@gmail.com',
    //     password: 'coolcooll',
    //     id: 'd6a95755-5f8c-4a1e-b02b-7274ac531706'
    // },
    //     {
    //         firstname: 'Anudeeps Naga',
    //         lastname: 'lakanavarapu',
    //         mail: 'anudeep4n@gmail.com',
    //         password: 'coolcooll',
    //         id: '77f8785f-1dbb-43d1-8687-5c39a778a85a'
    //     })
    console.log("its getting into service", data, _review, _user)
    let final:any=[]
    data.filter((bookId: any) => {
        console.log(bookId)
        let count=0
        let reviews: any = []
        const data1 = _review.filter((obj: any) => {
            console.log(obj)
            if (obj.bookId === bookId) {
                console.log("entered", _user, obj)
                const data2 = _user.find(objInside => {
                    if (objInside.id === obj.userId) {
                            obj.reviewerDetails = objInside;
                            reviews.push(obj);
                        console.log("entered deeper", objInside.id, obj.userId, objInside, obj,reviews)
                    }
                })
            }
        })
        let array=reviews.slice(0,2)
        console.log(array,"reviews")
        final.push(array)

    })
    console.log("revi",final)
    return final
}