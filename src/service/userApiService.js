import db from "../models/index";

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
            limit: limit
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
        await db.User.create({

        })
    } catch(err){
        console.log(err);
    }
}

const updateUser = async (data) => {
    try{
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if(user){
            user.update({

            })
        } else{

        }
    } catch(err){
        console.log(err);
    }
}

const deleteUser = async (id) => {
    try{
        await db.User.delete({
            where: { id: id }
        })
    } catch(err){
        console.log(err);
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}