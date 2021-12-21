const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const path = require('path');
dotenv.config();
const app = express();
const { body, validationResult } = require('express-validator');


const animaliRouter = require("./01routers/animali.js");
const classiRouter = require("./01routers/classi.js")


const zooControllers = require("./02controllers/zoo.js");
const zooModels = require("./03models/zoo.js");


const router = express.Router();

app.use(express.urlencoded({ extended: true }));    //utilizzare il www-form

zooModels.charge();     //caricare il db

app.use("/", function (req, res, next) {    //visualizzo tutti i tipi di richieste
    console.log(req.method, req.url, req.query, req.body);
    next();
});

app.use("/animali/",animaliRouter);
app.use("/classi/",classiRouter);




app.listen(process.env.PORT, process.env.HOST, function () {    //avvio il server
    console.log("Server avviato sulla porta " + process.env.PORT);
});

app.use(express.static("views"));