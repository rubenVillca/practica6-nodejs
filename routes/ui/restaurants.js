var express = require('express');
var router = express.Router();
var RestaurantController = require("../../controllers/restaurants.controller");
let restaurantController = new RestaurantController();

var UserController = require("../../controllers/users.controller");
let userController = new UserController();

var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
router.get('/restaurants', async (req, res, next) => {
    try {
      const restaurants = await restaurantController.getAll();
      res.render('restaurants', { data: restaurants })
    } catch (e) {
      res.render('fail', { message: e })
    }
  });
  
  router.get('/restaurantsclient', async (req, res, next) => {
    try {
      const restaurants = await restaurantController.getAll();
      res.render('restaurantsclient', { data: restaurants })
    } catch (e) {
      res.render('fail', { message: e })
    }
  });
  
  router.get('/restaurantcategory', async (req, res, next) => {
    try {
	var category = req.query.category;
      const restaurants = await restaurantController.getAllByCategory(category);
      res.render('category', { data: restaurants })
    } catch (e) {
      res.render('fail', { message: e })
    }
  });
  
   router.get('/restaurantsclient/:id', async (req, res, next) => {
    try {
		let id = req.params.id;
    const restaurant = await restaurantController.getOne(id);
    var users = await userController.getAllWithAsync();
		res.render('restaurantclient', { data: restaurant, users: users })
	  } catch (e) {
		res.render('fail', { message: e })
	  }
  });

router.get('/restaurants/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const restaurant = await restaurantController.getOne(id);
    res.render('restaurant', { data: restaurant })
  } catch (e) {
    res.render('fail', { message: e })
  }
});



router.post('/restaurants', async (req, res, next) => {
  try {
    var newpath1 = "";
    var newpath2 = "";
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    var formfields = await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
          if (err) {
            reject(err);
            return;
          }
          var oldpath = files.rest_image1.path;
          var currentpath = path.join(__dirname, '../../public/uploads/');
          newpath1 = currentpath + files.rest_image1.name;
          var dataread = fs.readFileSync(oldpath);
          fs.writeFileSync(newpath1, dataread);
          
          
          fields.rest_image1 = files.rest_image1.name;

          oldpath = files.rest_image2.path;
          currentpath = path.join(__dirname, '../../public/uploads/');
          newpath2 = currentpath + files.rest_image2.name;
          var dataread = fs.readFileSync(oldpath);
          fs.writeFileSync(newpath2, dataread);
          fields.rest_image2 = files.rest_image2.name;
          resolve(fields);
        }); 
    });

    const restaurant = await restaurantController.insert(formfields);
    const restaurants = await restaurantController.getAll();
    res.render('restaurants', { data: restaurants })
  } catch (e) {
    res.render('fail', { message: e })
  }
});



router.put('/restaurants/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let dataToUpdate = req.body;
    const restaurant = await restaurantController.edit(id, dataToUpdate);
    const restaurants = await restaurantController.getAll();
    res.render('restaurants', { data: restaurants })
  } catch (e) {
    res.render('fail', { message: e })
  }
});

router.delete('/restaurants/:id', async (req, res, next) => {
  try {
    let id = req.params.id;    
    const restaurant = await restaurantController.delete(id);
    const restaurants = await restaurantController.getAll();
    res.render('restaurants', { data: restaurants })
  } catch (e) {
    res.render('fail', { message: e })
  }
});


router.get('/formcreaterestaurant', async (req, res, next) => {
  try {
    res.render('formcreaterestaurant', { })
  } catch (e) {
    res.render('fail', { message: e })
  }
})


router.get('/formupdaterestaurant/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const restaurant = await restaurantController.getOne(id);
    res.render('formupdaterestaurant', { data: restaurant })
  } catch (e) {
    res.render('fail', { message: e })
  }
})

module.exports = router;
