
var express = require('express');
var router = express.Router();
var UserController = require("../../controllers/users.controller");
let userController = new UserController(true);
/*router.get('/users', userController.getAll);

router.get('/users/:id', userController.getOne);

router.post('/users', userController.insert.bind(userController));

router.put('/users/:id', userController.edit);

router.delete('/users/:id', userController.delete);

module.exports = router;
*/
