const express = require("express");
const router = express.Router();
const Aliens = require("../models/aliens");

router.get("/", async (req, res, next) => {
  try {
    const aliens = await Aliens.find();
    res.json(aliens);
  } catch (error) {
    next(error);
  }
  console.log("get request");
});

router.get("/:id", async (req, res, next) => {
    try {
      const alien = await Aliens.findById(req.params.id);
      res.json(alien);
    } catch (error) {
      next(error);
    }
  });
  
router.post("/", async (req, res, next) => {

    const alien = new Aliens({
      name: req.body.name,
      tech: req.body.tech,
      sub: req.body.sub,
    });

    try {
    const result = await alien.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async(req, res, next) => {
    try {
        let alien = await Aliens.findById(req.params.id);
        alien.sub = req.body.sub;
        let result = await alien.save();
        res.send(result);
    } catch(error) {
        next(error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let alien = Aliens.findById(req.params.id);
        let result = await alien.deleteOne();
        res.send(result);
    } catch(error) {
        res.send(error);
    }
})

module.exports = router;
