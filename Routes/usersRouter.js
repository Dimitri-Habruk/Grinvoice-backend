const express = require('express')
const usersRouter = require('express').Router()

const users = require("../models/users.model")

usersRouter.use(express.json())

// usersRouter.get('/users', (req, res) => {
//     users.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err))
// })

// usersRouter.post('/users', (req, res) => {
//     users
//     .create(req.body)
//     .then(newUser => res.json(newUser))
//     .catch((err) => res.json(err))
// })

usersRouter.get('/users/:id' , (req, res) => {
    users.findOne({ _id : req.params.id })
    //users.findOneById(req.params.id)
    .then((users)  => res.json(users))
    .catch((err) => console.log(err))
})

usersRouter.put('/users/:id' , async (req, res) => {
    // const userToUpdate = await users.findOne({ _id : req.params.id })
    // await userToUpdate.updateOne(req.body, {new:true})
   await users.findOneAndUpdate({ _id : req.params.id}, req.body, {new:true} ) 
    await users.findOne({ _id : req.params.id })
    .then((user)=> res.json(user))
    .catch((err) => res.json(err))

})

usersRouter.delete('/users/:id' , (req, res) => {
    users.deleteOne({ _id : req.params.id })
    .then (() => res.json('User deleted'))
    .catch((err) => res.json(err))
})

module.exports = usersRouter
