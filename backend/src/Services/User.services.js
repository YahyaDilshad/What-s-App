    import usermodel from '../models/user.model.js'


    const createUser = async ({
        firstname , lastname ,email ,password ,profilepic
    })=>{
        if(!firstname || !email || !password ) throw new Error("all fields are required ")

        const user  = await usermodel.create({
        fullname :{
            firstname,
            lastname,
        },
            email,
            password,
            profilepic
        })
        return user
    }

    export default {
    createUser
    }