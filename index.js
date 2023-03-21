const express = require ('express');
const app = express();
const mysql = require("mysql")
const cors = require("cors");
const { response } = require('express');

const db = mysql.createPool({
    host:"us-cdbr-east-06.cleardb.net",
    user:"bbc2e3d82d142f",
    password:"4532f749",
    database:"heroku_097b4127bff040d"
})


app.use(cors());
app.use(express.json());

app.get("/getCards", (req,res)=>{
    let SQL = "SELECT * FROM pacientes"
    db.query(SQL,function(err,response){
        if(err) console.log(err);
        if(response)res.send(response)
    })
})

app.get("/getEstados", (req,res)=>{
    let SQL = "SELECT * FROM heroku_097b4127bff040d.estado"
    db.query(SQL,function(err,response){
        if(err) console.log(err);
        if(response)res.send(response)
    })
})

app.get("/getCidades/:estado",(req,res)=>{
    const {estado} = req.params;
    console.log("index", estado)
    let SQL = "SELECT * FROM heroku_097b4127bff040d.cidade WHERE uf = ?"
    db.query(SQL,[estado],(err,response)=>{
        if(err)console.log(err)
        if(response)res.send(response)
    })
})

app.post("/register", (req,res)=>{
    const {name} = req.body;
    const {idade} = req.body;
    const {cpf} = req.body;
    const {rg} = req.body;
    const {sexo} = req.body;
    const {rua} = req.body;
    const {numero} = req.body;
    const {bairro} = req.body;
    const {cidade} = req.body;
    const {trabalho} = req.body

    let SQL = "INSERT INTO pacientes (nome, idade, cpf, rg, sexo, cidade, trabalho, rua, numero,bairro) values (?,?,?,?,?,?,?,?,?,?)"
    db.query(SQL,[name,idade,cpf,rg,sexo,cidade,trabalho,rua,numero,bairro],(err,result)=>{
        console.log(err)
    })
})

app.delete("/delete/:id", (req,res)=>{
    const {id} = req.params;
    let SQL = "DELETE FROM pacientes WHERE idpacientes = ?";
    db.query(SQL,[id],(err,result)=>{
        if(err){console.log(err)}
        else {res.send(result)}
    })
})

app.put("/edit", (req,res)=>{
    const {id} = req.body;
    const {name} = req.body;
    const {idade} = req.body;
    const {cpf} = req.body;
    const {rg} = req.body;
    const {sexo} = req.body;
    const {rua} = req.body;
    const {numero} = req.body;
    const {bairro} = req.body;
    const {cidade} = req.body;
    const {trabalho} = req.body
 

    let SQL = "UPDATE pacientes SET nome = ?, idade= ?, cpf= ?, rg= ?, sexo= ?, cidade= ?, rua= ?, numero= ?, bairro= ?, trabalho= ? WHERE idpacientes = ? "

    db.query(SQL,[name,idade,cpf,rg,sexo,cidade,rua,numero,bairro,trabalho,id], (err, result)=>{
        if(err) console.log(err ,result)
        else res.send(result)
    })
})

app.listen(3001,() =>{
    console.log('rodando')
})