import userApiService from "../service/userApiService"

const readFunc = async (req, res) => {
    try{
        let data = await userApiService.getAllUser();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const createFunc = (req, res) => {
    try{

    } catch(err){
        console.log(err);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const updateFunc = (req, res) => {
    try{

    } catch(err){
        console.log(err);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const deleteFunc = (req, res) => {
    try{

    } catch(err){
        console.log(err);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}