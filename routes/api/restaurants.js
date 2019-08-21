var express = require('express');
var router = express.Router();
var RestaurantController = require("../../controllers/restaurants.controller");
let restaurantController = new RestaurantController();

router.get('/restaurants', async (req, res, next) => {
    try {
      const restaurants = await restaurantController.getAll();
      res.send(restaurants);
    } catch (e) {
      res.send("Error:" + e);
    }
  });

router.get('/restaurants/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const restaurant = await restaurantController.getOne(id);
    res.send(restaurant);
  } catch (e) {
    res.send("Error:" + e);
  }
});

router.post('/restaurants', async (req, res, next) => {
  try {
    let dataToSave = req.body;
    const restaurant = await restaurantController.insert(dataToSave);
    res.send(restaurant);
  } catch (e) {
    res.send("Error:" + e);
  }
});

router.put('/restaurants/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let dataToUpdate = req.body;
    const restaurant = await restaurantController.edit(id, dataToUpdate);
    res.send(restaurant);
  } catch (e) {
    res.send("Error:" + e);
  }
});

router.delete('/restaurants/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const restaurant = await restaurantController.delete(id);
    res.send(restaurant);
  } catch (e) {
    res.send("Error:" + e);
  }
});

module.exports = router;
