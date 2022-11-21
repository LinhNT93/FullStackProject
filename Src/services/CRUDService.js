import bcrypt from 'bcryptjs';
import { application } from 'express';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createUser = async (data) =>{
    return new Promise(async (resolve,reject)=>{
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName, 
                address: data.address,
                phoneNumber: data.phoneNumber, 
                gender: data.gender==='1'?true:false,
                image: data.image,
                roleID: data.roleID, 
                positionId: data.positionId
            })
            resolve('ok create success')
        }catch(e){
            reject(e);
        }
})
}

let hashUserPassword = (password)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
          
    })
}

let getAllUser = () => {
    return new Promise(async (resolve,reject)=>{
        try{
            let user = await db.User.findAll({
                raw: true
            });
            resolve(user);
        }catch(e){
            reject(e)
        }
    })

}

let getUserInfoById  = (userId)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            if (user){
                resolve(user);
            } 
            else{
                resolve([])
            }             
        }catch(e){
            reject(e)
        }
    })
}

let updateUserData =  (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where: {id: data.id},
            })
            if (user){
               user.firstName = data.firstName
               user.lastName = data.lastName
               user.address = data.address
               await user.save()
               resolve();
            }
            else{
                resolve();
            }
        }catch(e){
            console.log(e)
        }
    })
}


module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData 
}