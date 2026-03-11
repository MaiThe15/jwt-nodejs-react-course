require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try{
        token = jwt.sign(payload, key);
        // console.log(token);
    } catch(err){
        console.log(err);
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try{
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch(err){
        console.log(err);
    }
    return data;

    // jwt.verify(token, key, function(err, decoded) {
    //     if(err){
    //         console.log(err);
    //         return data;
    //     }
    //     // console.log(decoded);
    //     return decoded;
    // });
}

module.exports = {
    createJWT, verifyToken
}