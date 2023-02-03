const express = require('express')
const ticketsRouter = require('express').Router()
const multer = require('multer')
// const path = require('path')
const fs = require('fs');
const tickets = require("../models/tickets.model")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'assets/images/');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +  '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });




ticketsRouter.use(express.json())

ticketsRouter.get('/tickets', (req, res) => {
    tickets.find()
    // .populate("ticketHolder")
    .then((tickets) => res.json(tickets))
    .catch((err) => res.json(err))
})

ticketsRouter.post('/tickets', upload.single('image'), (req, res) => {
    try{
        const ticket = new tickets({
            name: req.body.name,
            image: '/assets/images/' + req.file.filename
        });

        ticket.save()
        res.status(201).json(ticket)
    }
    
    catch(err){
        res.json(err)
    }
   
    // tickets
    // .create(req.body)
    // .then(newTicket => res.json(newTicket))
    // .catch((err) => res.json(err))
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

ticketsRouter.get('/tickets/user/:id' , (req, res) => {
    tickets
    .find({ ticketHolder : req.params.id })
    // .populate("ticketHolder")
    .then((tickets)  => res.json(tickets))
    .catch((err) => console.log(err))
})

module.exports = ticketsRouter
