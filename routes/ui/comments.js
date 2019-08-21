var express = require('express');
var router = express.Router();
var CommentController = require("../../controllers/comments.controller");
let commentController = new CommentController();

var RestaurantController = require("../../controllers/restaurants.controller");

let restaurantController = new RestaurantController();

var UserController = require("../../controllers/users.controller");
let userController = new UserController();


router.get('/comments', async (req, res, next) => {
    try {
      const comments = await commentController.getAll();
      res.render('comments', { data: comments })
    } catch (e) {
      res.render('fail', { message: e })
    }
  });

router.get('/comments/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const comment = await commentController.getOne(id);
    res.render('comment', { data: comment })
  } catch (e) {
    res.render('fail', { message: e })
  }
});

router.post('/comments', async (req, res, next) => {
  try {
    let dataToSave = req.body;
    const comment = await commentController.insert(dataToSave);
    const comments = await commentController.getAll();
    res.render('comments', { data: comments })
  } catch (e) {
    res.render('fail', { message: e })
  }
});

router.post('/commentsclient', async (req, res, next) => {
  try {
    let dataToSave = req.body;
    const comment = await commentController.insert(dataToSave);
    const comments = await commentController.getOnePopulate(comment._id);
    res.render('commentclient', { data: comments, layout:false })
  } catch (e) {
    res.render('fail', { message: e })
  }
});

router.put('/comments/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let dataToUpdate = req.body;
    const comment = await commentController.edit(id, dataToUpdate);
    const comments = await commentController.getAll();
    res.render('comments', { data: comments })
  } catch (e) {
    res.render('fail', { message: e })
  }
});

router.delete('/comments/:id', async (req, res, next) => {
  try {
    let id = req.params.id;    
    const comment = await commentController.delete(id);
    const comments = await commentController.getAll();
    res.render('comments', { data: comments })
  } catch (e) {
    res.render('fail', { message: e })
  }
});


router.get('/formcreatecomment', async (req, res, next) => {
  try {
    var data = req.query;

      var users = await userController.getAllWithAsync();
      var restaurants = await restaurantController.getAll();

    res.render('formcreatecomment', {data: data, restaurants: restaurants, users: users})
  } catch (e) {
    res.render('fail', { message: e })
  }
})


router.get('/formupdatecomment/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const comment = await commentController.getOne(id);
    res.render('formupdatecomment', { data: comment })
  } catch (e) {
    res.render('fail', { message: e })
  }
})






module.exports = router;
