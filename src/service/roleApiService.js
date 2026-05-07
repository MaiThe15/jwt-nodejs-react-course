import db from "../models/index";

const createNewRoles = async (roles) => {
    try{
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })

        const persists = roles.filter(({ url: id1 }) => !currentRoles.some(({ url: id2 }) => id2 === id1));
        if(persists.length === 0){
            return {
                EM: 'Nothing to create',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: 'Create roles success',
            EC: 0,
            DT: []
        }
    } catch(error){
        console.log(err);
        return {
            EM: 'something wrong with the services',
            EC: 1,
            DT: []
        }
    }
}

const getAllRoles = async () => {
    try{
        let data = await db.Role.findAll({
            order: [['id', 'DESC']]
        });
        return {
            EM: 'Get all roles success',
            EC: 0,
            DT: data
        }
    } catch(error){
        console.log(err);
        return {
            EM: 'something wrong with the services',
            EC: 1,
            DT: []
        }
    }
}

const updateRole = async (data) => {
    try{
        // if(!data.groupId){
        //     return {
        //         EM: 'Error with empty groupId',
        //         EC: 1,
        //         DT: 'group'
        //     } 
        // }
        let role = await db.Role.findOne({
            where: { id: data.id }
        })
        if(role){
            await role.update({
                url: data.url,
                description: data.description
            })
            return {
                EM: 'Update role success',
                EC: 0,
                DT: ''
            }
        } else{
            return {
                EM: 'Role not found',
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

const deleteRole = async (id) => {
    try{
        let role = await db.Role.findOne({
            where: {id: id}
        })
        if(role){
            await role.destroy();
        }
        return {
            EM: 'Delete roles success',
            EC: 0,
            DT: []
        }
    } catch(error){
        console.log(err);
        return {
            EM: 'something wrong with the services',
            EC: 1,
            DT: []
        }
    }
}

const getRoleByGroup = async (id) => {
    try{
        if(!id){
            return{
                EM: 'Not found role',
                EC: 0,
                DT: []
            }
        }
        let roles = await db.Group.findOne({
            where: {id: id},
            attributes: ["id", "name", "description"],
            include: { 
                model: db.Role, 
                attributes: ["id", "url", "description"],
                through: { attributes: [] } 
            }
        })
        return {
            EM: 'Get roles by group success',
            EC: 0,
            DT: roles
        }
    } catch(error){
        console.log(err);
        return {
            EM: 'something wrong with the services',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewRoles, getAllRoles, updateRole, deleteRole, getRoleByGroup
}