// ##### Variables de entorno
// const dotenv = require('dotenv').config();
// console.log(process.env.DB_NAME)
// #####
// Haremos un CRUD :)
const express = require('express');
const account_types = require('./models/account_types');
const dotenv = require('dotenv').config();
const {clients_second} = require("./models");
const PORT = process.env.PORT || 8080;
// Importar modelo de base de datos

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))

app.get("/", async (req,res) => {
    // let results = await clients.findAll({raw:true});
    // console.log(results);
    res.send("hello")
})


app.get("/home", async (req,res) => {
    res.render('home')
})


app.get("/clients", async (req,res) => {
    let results = await clients_second.findAll({raw: true});
    res.render('clients',{clients: results})
})

//Create User
app.post("/clients", async (req,res) => {
    const {first_name, last_name, email, phone} = req.body;
    try{
        let results = await clients_second.create({first_name,last_name, email, phone});
        res.send('Un nuevo cliente ha sido añadido')
    } catch(err){
        console.log(err)
        res.status(400).send("No se ha podido agregar el tipo de cuenta");
    }
})

//update
app.get("/clients/update/:id", (req, res) => {
    // console.log(req.params.id)
    res.render('clients_update',{id: req.params.id})
})

app.post("/clients/update/:id", async (req, res) => {
    let idAux = req.params.id;
    const obj = JSON.parse(JSON.stringify(req.body));
    let objectToUpdate = {}
    
    for (let field in obj) {
        if (obj[field] !== ''){
            objectToUpdate[field] = obj[field]
        }
    }
    
    try {
        let results = await clients_second.update(objectToUpdate, {where: {id: idAux}})
        res.send('ok')
    } catch(er) {
        console.log(er)
        res.status(400).send('Algo salió mal')
    }
})

//Delete
app.get("/clients/delete/:id", async (req, res) => {
    let idAux = req.params.id;
    // res.send('delete client ' + req.params.id)
    try {
        let results = await clients_second.destroy({where: {id: idAux}})
        res.send('user TERMINATED')
    } catch(er) {
        res.status(400).send('user NNNOT TERMINATED / Algo salió mal')
    }
})


app.listen(PORT, () => {
    console.log('The server is running at port ' + PORT);
})
