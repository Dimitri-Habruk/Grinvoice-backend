const express = require('express')
const ticketsRouter = require('express').Router()
const multer = require('multer')
// const path = require('path')
const fs = require('fs');
const tickets = require("../models/tickets.model");
const {verifyMW, adminCheck} = require('../middleware/verify');
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

ticketsRouter.get('/tickets/admin',verifyMW, adminCheck, async (req, res) => {
    try {
    const ticketsAll = await tickets.find()
   .populate("ticketHolder")
    res.status(200).json({ success : true, allTickets : ticketsAll })
    } 
    catch(error) {
        res.status(500).json({ success : false, message : error })
    }
      
})
//
ticketsRouter.post('/tickets/admin',verifyMW, upload.single('image'), (req, res) => {
    try{
        const ticket = new tickets({
            title: req.body.title,
            image: '/assets/images/' + req.file.filename,
            ticketHolder : req.user._id
        });

        ticket.save()
        res.status(201).json(ticket)
    }
    
    catch(err){
        console.log(err)
    }
})

ticketsRouter.get('/tickets/:id',verifyMW, (req, res) => {
    try{
    tickets
    .findOne({ _id : req.params.id })
    .populate("ticketHolder")
    .then((tickets)  => res.json(tickets))
    }
    catch(err){
        console.log(err)
    }

    // .catch(err => res.status(500).json(err))
})

ticketsRouter.put('/tickets/:id',verifyMW, async (req, res) => {
    try{
    const updatedTicket = await tickets.findByIdAndUpdate(req.params.id, req.body, {new: true}) 
    res.json(updatedTicket)
    }
    catch(err){
        res.status(500).json(err)
    }
})

ticketsRouter.delete('/tickets/:id',verifyMW, (req, res) => {
    try{
    tickets.deleteOne({ _id : req.params.id })
    .then (() => res.json('Ticket deleted'))
    }
    catch(err){
        res.status(500).json(err)
    }
})

//je dois créer la route où utilisateur connecté peut voir tous ses tickets
//je dois créer la route où utilisateur connecté peut voir tous ses tickets :id - chaque ticket ///// req.user.user = c'est l'user connecté
//je dois créer la route où utilisateur connecté peut voir son profil + modifier + delete son profil uniquement
//findonebyid



ticketsRouter.get('/tickets/user/:id',verifyMW,adminCheck, (req, res) => {
    try{
        tickets
    .find({ ticketHolder : req.params.id })
    // .populate("ticketHolder")
    .then((tickets)  => res.json(tickets))
    }
    catch(err){
        res.status(500).json(err)
    }})

module.exports = ticketsRouter
