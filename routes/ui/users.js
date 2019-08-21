var express = require('express');
var router = express.Router();
var userModel = require("../../models/users.model");
var UserController = require("../../controllers/users.controller");
let userController = new UserController(false);
router.get('/users', userController.getAll);

router.get('/users/:id', userController.getOne);

router.post('/users', userController.insert.bind(userController));

router.put('/users/:id', userController.edit);

router.delete('/users/:id', userController.delete);

router.get('/formcreate', userController.displayCreateForm);

router.get('/formupdate/:id', userController.displayUpdateForm);






module.exports = router;
