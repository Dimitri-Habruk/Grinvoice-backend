const express = require("express");
const { verifyMW, adminCheck } = require("../middleware/verify");
const usersRouter = require("express").Router();

const users = require("../models/users.model");

usersRouter.use(express.json());

usersRouter.get("/users", verifyMW, adminCheck, async (req, res) => {
  try {
    await users.find().then((users) => res.json(users));
  } catch (err) {
    res.status(500).json(err);
  }
});

usersRouter.post("/users", (req, res) => {
  try {
    users.create(req.body).then((newUser) => res.json(newUser));
  } catch (err) {
    res.status(500).json(err);
  }
});

usersRouter.get("/users/:id", verifyMW, async (req, res) => {
  try {
    console.log(req.user.user.isAdmin)
    if(req.user.user.isAdmin == false) {

        const { _id } = req.user.user;
        if (_id == req.params.id) {
            await users
            .findOne({ _id: req.params.id })
            //    await users.findOneById(req.params._id) MARCHE PAS ! ! !
            .then((user) => res.json(user));  }
     } else {
        await users
            .findOne({ _id: req.params.id })
            //    await users.findOneById(req.params._id) MARCHE PAS ! ! !
            .then((user) => res.json(user));
     }
        //63dbd89b4a07f3b3c48ddbed = 666
        //63dbba46307667aa24497475  63dbbb16307667aa2449747f   63dbbfaa307667aa2449749c
    } 
    catch (err) {
    res.status(500).json(err);
  }
});

usersRouter.put("/users/:id", verifyMW, async (req, res) => {
  try {
    await users.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    await users.findOne({ _id: req.params.id }).then((user) => res.json(user));
  } catch (err) {
    res.status(500).json(err);
  }
});

usersRouter.delete("/users/:id", verifyMW, (req, res) => {
  try {
    users
      .deleteOne({ _id: req.params.id })
      .then(() => res.json("User deleted"));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = usersRouter;
