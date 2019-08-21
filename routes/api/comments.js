var express = require('express');
var router = express.Router();
var CommentController = require("../../controllers/comments.controller");
let commentController = new CommentController();
router.get('/comments', async (req, res, next) => {
    try {
      const comments = await commentController.getAll();
      res.send(comments);
    } catch (e) {
      res.send("Error:" + e);
    }
  });

router.get('/comments/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const comment = await commentController.getOne(id);
    res.send(comment);
  } catch (e) {
    res.send("Error:" + e);
  }
});

router.post('/comments', async (req, res, next) => {
  try {
    let dataToSave = req.body;
    const comment = await commentController.insert(dataToSave);
    res.send(comment);
  } catch (e) {
    res.send("Error:" + e);
  }
});

router.put('/comments/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let dataToUpdate = req.body;
    const comment = await commentController.edit(id, dataToUpdate);
    res.send(comment);
  } catch (e) {
    res.send("Error:" + e);
  }
});

router.delete('/comments/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    const comment = await commentController.delete(id);
    res.send(comment);
  } catch (e) {
    res.send("Error:" + e);
  }
});

module.exports = router;
