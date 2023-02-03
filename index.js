const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const app = express()
require("dotenv").config()

app.use(cors())

const port = process.env.PORT

app.use(express.urlencoded({extended : true}))

const usersRouter = require("./Routes/usersRouter")
const ticketsRouter = require("./Routes/ticketsRouter")
const categoryRouter = require("./Routes/categoryRouter");
const authRouter = require("./Routes/authRouter");


app.use('/', usersRouter)
app.use('/', ticketsRouter)
app.use('/', categoryRouter)
app.use('/', authRouter)





app.get('/', (req, res) => {
    res.send("Welcome to Grinvoice").status(200)
    
})

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI, { useNewUrlParser : true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error :"))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})