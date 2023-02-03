const express = require('express')
const categoryRouter = require('express').Router()

const category = require("../models/category.model")

categoryRouter.use(express.json())

categoryRouter.get('/category', (req, res) => {
    category.find()
    // .populate("ticketHolder")
    .then((category) => res.json(category))
    .catch((err) => res.json(err))
})
/*
ticketsRouter.post('/tickets', (req, res) => {
    tickets
    .create(req.body)
    .then(newTicket => res.json(newTicket))
    .catch((err) => res.json(err))
})

ticketsRouter.get('/tickets/:id' , (req, res) => {
    tickets
    .findOne({ _id : req.params.id })
    .populate("ticketHolder")
    .then((tickets)  => res.json(tickets))
    .catch((err) => console.log(err))
})

ticketsRouter.put('/tickets/:id' , async (req, res) => {
    await tickets.findOne({ _id : req.params.id })
    await tickets.updateOne({ $set : req.body })
    await tickets.findOne({ _id: req.params.id })
    .then ((newTicket) => res.json(newTicket))
    .catch((err) => res.json(err))

})

ticketsRouter.delete('/tickets/:id' , (req, res) => {
    tickets.deleteOne({ _id : req.params.id })
    .then (() => res.json('Ticket deleted'))
    .catch((err) => res.json(err))
})

categoryRouter.get('/tickets/user/:id' , (req, res) => {
    tickets
    .find({ ticketHolder : req.params.id })
    // .populate("ticketHolder")
    .then((tickets)  => res.json(tickets))
    .catch((err) => console.log(err))
})
*/
module.exports = categoryRouter
