var express = require('express');
var router = express.Router();
var loginModel = require("../../models/users.model");
var LoginController = require("../../controllers/login.controller");
let loginController = new LoginController(false);

var UserController = require("../../controllers/users.controller");
let userController = new UserController(false);

router.get('/login', loginController.get);
router.post('/login', async (req,res)=> {
    let name = req.body.user_name;
    let password = req.body.user_password;
    const user = await loginController.login(name,password);
    if (null!=user){
        res.redirect(307,'http://localhost:3000/users');
    }else{
        res.render('login',{layout:false});
    }
});
router.get('/login/create', loginController.show);
router.post('/login/insert', async (req,res)=>{
    let password = req.body.user_password;
    let password_repeat = req.body.user_password_repeat;
    if (password===password_repeat){
        try {
            let userInsert=req.body;
            let userSaved=await loginController.insert(userInsert);
            res.render('login',{layout:false});
        }catch (e) {
            res.render('Error: '+e);
        }

    }else{
        //req.flash('info', 'Contrasena incorrecta!');
        res.render('formcreateuser',{layout:false});
    }

});

module.exports = router;
