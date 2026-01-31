import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmail = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if(user){
        return true;
    }
    return false;
}

const checkPhone = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if(user){
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    try{
        let isEmailExist = await checkEmail(rawUserData.email);
        if(isEmailExist === true){
            return {
                EM: 'The email is already exist',
                EC: '1'
            }
        } 

        let isPhoneExist = await checkPhone(rawUserData.phone);
        if(isPhoneExist === true){
            return {
                EM: 'The phone number is already exist',
                EC: '1'
            }
        }

        let hashPassword = hashUserPassword(rawUserData.password);

        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })

        return {
            EM: 'An user is created',
            EC: '0'
        }
    }catch(err){
        console.log(err)
        return {
            EM: 'Something wrong in service',
            EC: '-2'
        }
    }
    
}

module.exports = {
    registerNewUser
}