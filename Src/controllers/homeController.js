import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req,res)=>{
    try{
        let data = await db.User.findAll();
        // console.log(data)
        return res.render('homepage.ejs',{data: JSON.stringify(data)});
    } catch(e){
        console.log(e)
    }  
}

let getCRUD = (req,res)=>{
    return res.render('crud.ejs')
}

let postCRUD = async (req,res)=>{
    let message = await CRUDService.createUser(req.body);
    console.log(message)
    res.send('ok')
}

let displayGetCRUD = async (req,res)=>{
    let data = await CRUDService.getAllUser();
    //console.log(data)
    // return res.send('ok') 
    return res.render('displayCRUD.ejs',{dataTable: data})
}

let getEditCRUD = async (req,res)=>{
    let userId = req.query.id;
    console.log(userId)
    if (userId){
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log(userData);
        return res.render('editCRUD.ejs',{userData});
    }
    else{
        return res.send('Hello from Edit Page')
    }
    }
  
let putCRUD = async (req,res)=>{
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.redirect('/get-crud')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD
}