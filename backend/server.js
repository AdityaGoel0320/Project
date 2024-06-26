let dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });



const express = require('express');
const mongoose = require('mongoose');
const materialsRouter = require('./routes/materials');
let PORT = process.env.PORT || 5000;
const { frontendUrl } = require("./assets/BackendUtils");
let cors = require("cors")


const app = express();


const corsOptions = {
    origin: `${frontendUrl}`, // or an array of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));



require("./db/conn");


app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', materialsRouter);

app.listen(PORT, () => console.log(`Server Started AT ${PORT}`));
