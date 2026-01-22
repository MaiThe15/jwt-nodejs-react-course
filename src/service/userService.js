import bcrypt from 'bcryptjs';
// get the client
import mysql from 'mysql2/promise';
// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try{
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    }catch(err){
        console.log(">>> check error:", err);
    }
}

const getUserList = async () => {
    // test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ['id', 'username', 'email'],
        include: { model: db.Group, attributes: ['name', 'description'] },
        raw: true,
        nest: true
    })
    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    })
    console.log(">>>check new user: ", newUser)
    console.log(">>>check new group: ", roles) 

    let users = [];
    users = await db.User.findAll();
    return users;
    // // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    
    // try{
    //     // query database
    //     const [rows, fields] = await connection.execute( 'SELECT * FROM user');

    //     // console.log(">>> check rows:", rows);
    //     return rows;
    // }catch(err){
    //     console.log(">>> check error:", err);
    // }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {id: userId}
    })

    // // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    
    // try{
    //     // query database
    //     const [rows, fields] = await connection.execute( 'DELETE FROM user WHERE id=?', [id]);

    //     // console.log(">>> check rows:", rows);
    //     return rows;
    // }catch(err){
    //     console.log(">>> check error:", err);
    // }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: {id: id}
    })
    return user = user.get({plain: true})

    // // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    
    // try{
    //     // query database
    //     const [rows, fields] = await connection.execute( 'SELECT * FROM user WHERE id=?', [id]);

    //     // console.log(">>> check rows:", rows);
    //     return rows;
    // }catch(err){
    //     console.log(">>> check error:", err);
    // }
}

const updateUserInfor = async (email, username, id) => {
    await db.User.update(
        {
            email: email,
            username: username
        },
        {
            where: {id: id}
        }
    )
    
    // // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    
    // try{
    //     // query database
    //     const [rows, fields] = await connection.execute( 'UPDATE user SET email=?, username=? WHERE id=?', [email, username, id]);

    //     // console.log(">>> check rows:", rows);
    //     return rows;
    // }catch(err){
    //     console.log(">>> check error:", err);
    // }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}