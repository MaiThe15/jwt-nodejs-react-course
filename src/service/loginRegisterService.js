require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";

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
                EC: '1',
                DT: 'email'
            }
        } 

        let isPhoneExist = await checkPhone(rawUserData.phone);
        if(isPhoneExist === true){
            return {
                EM: 'The phone number is already exist',
                EC: '1',
                DT: 'phone'
            }
        }

        let hashPassword = hashUserPassword(rawUserData.password);

        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4
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

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })

        if(user) {
            // console.log(">>> found user")
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if(isCorrectPassword === true) {
                // let token = 
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload);
                return {
                    EM: 'ok',
                    EC: '0',
                    DT: {
                        access_token: token,
                        groupWithRoles
                    }
                }
            }
        }
        // console.log(">>> User with email/phone:", rawData.valueLogin, " password:", rawData.password);
        return {
            EM: 'Your email/phone or password is incorrect',
            EC: '1',
            DT: ''
        }
    
        console.log(">>> check user:", user)
        // if(isEmailExist === false){
        //     return {
        //         EM: '',
        //         EC: '1',
        //         DT: ''
        //     }
        // } 
    }catch(err) {
        console.log(err)
        return {
            EM: "Something wrongs in service",
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmail, checkPhone
}