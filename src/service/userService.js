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

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function(err, results, fields) {
            if(err){
                console.log(err)
            }
            console.log(results);
        }
    );
}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    
    let users = [];

    // connection.query(
    //     'SELECT * FROM users',
    //     function(err, results, fields) {
    //         if(err){
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         console.log(">>> run get user list:", users)
    //         return users;
    //     }
    // );

    try{
        // query database
        const [rows, fields] = await connection.execute( 'SELECT * FROM users');

        // console.log(">>> check rows:", rows);
        return rows;
    }catch(err){
        console.log(">>> check error:", err);
    }
}

module.exports = {
    createNewUser, getUserList
}