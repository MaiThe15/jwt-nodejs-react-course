import db from "../models/index";
import loginRegisterService from "./loginRegisterService";

const getAllUser = async () => {
    let data = {
        EM: '',
        EC: '',
        DT: ''
    }
    try{
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'phone', 'sex'],
            include: { model: db.Group, attributes: ['name', 'description'] }
        });
        if(users){
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        } else{
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    } catch(err){
        console.log(err);
        return {
            EM: 'something wrong with services',
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try{
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
            include: { model: db.Group, attributes: ['name', 'description', 'id'] },
            order: [['id', 'DESC']]
        })
        let totalPages = Math.ceil(count/limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        // console.log(">>> check data:", data);
        return {
            EM: 'get data success',
            EC: 0,
            DT: data
        }
    } catch(err){
        console.log(err);
        return {
            EM: 'something wrong with services',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try{
        let isEmailExist = await loginRegisterService.checkEmail(data.email);
        if(isEmailExist === true){
            return {
                EM: 'The email is already exist',
                EC: '1',
                DT: 'email'
            }
        } 

        let isPhoneExist = await loginRegisterService.checkPhone(data.phone);
        if(isPhoneExist === true){
            return {
                EM: 'The phone number is already exist',
                EC: '1',
                DT: 'phone'
            }
        }

        let hashPassword = loginRegisterService.hashUserPassword(data.password);

        await db.User.create({...data, password: hashPassword});
        return {
            EM: 'create ok',
            EC: 0,
            DT: []
        }
    } catch(err){
        console.log(err);
    }
}

const updateUser = async (data) => {
    try{
        if(!data.groupId){
            return {
                EM: 'Error with empty groupId',
                EC: 1,
                DT: 'group'
            } 
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if(user){
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update user success',
                EC: 0,
                DT: ''
            }
        } else{
            return {
                EM: 'user not found',
                EC: 1,
                DT: ''
            }
        }
    } catch(err){
        console.log(err);
        return {
            EM: 'something wrong with the services',
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try{
        let user = await db.User.findOne({
            where: { id: id }
        })

        if(user){
            await user.destroy();
            return {
                EM: 'delete user success',
                EC: 0,
                DT: []
            }
        } else{
            return {
                EM: 'user not exist',
                EC: 2,
                DT: []
            }
        }
    } catch(err){
        console.log(err);
        return {
            EM: 'something wrong with services',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}