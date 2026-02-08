import userApiService from "../service/userApiService"

const readFunc = async (req, res) => {
    try{
        if(req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit;
            // console.log("check data: ", "page: ", page, "limit: ", limit);
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else{
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
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

const deleteFunc = async (req, res) => {
    try{
        // console.log(">>> req.body:", req.body)
        let data = await userApiService.deleteUser(req.body.id);
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

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}