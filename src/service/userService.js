import bcrypt from 'bcryptjs';
// get the client
import mysql from 'mysql2/promise';
// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    let hashPass = hashUserPassword(password);
    try{
        const [rows, fields] =
        await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
            [email, hashPass, username]);
    }catch(err){
        console.log(">>> check error:", err);
    }
}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    
    try{
        // query database
        const [rows, fields] = await connection.execute( 'SELECT * FROM users');

        // console.log(">>> check rows:", rows);
        return rows;
    }catch(err){
        console.log(">>> check error:", err);
    }
}

const deleteUser = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    
    try{
        // query database
        const [rows, fields] = await connection.execute( 'DELETE FROM users WHERE id=?', [id]);

        // console.log(">>> check rows:", rows);
        return rows;
    }catch(err){
        console.log(">>> check error:", err);
    }
}

const getUserById = async (id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    
    try{
        // query database
        const [rows, fields] = await connection.execute( 'SELECT * FROM users WHERE id=?', [id]);

        // console.log(">>> check rows:", rows);
        return rows;
    }catch(err){
        console.log(">>> check error:", err);
    }
}

const updateUserInfor = async (email, username, id) => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    
    try{
        // query database
        const [rows, fields] = await connection.execute( 'UPDATE users SET email=?, username=? WHERE id=?', [email, username, id]);

        // console.log(">>> check rows:", rows);
        return rows;
    }catch(err){
        console.log(">>> check error:", err);
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}