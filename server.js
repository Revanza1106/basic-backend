const express = require("express");
const bono = require("bono")
const app = express();
const port = 3000;
const bodyParser = require("body-parser")
const db = require("./dataBase");
const connection = require("./connection")
const response = require("./response")

class App extends bono {}

app.use(bodyParser.json())

app.get('/',(req,res) => {
 response(200,"API V1 ready","SUCCESS",res)
}) 

app.get('/siswa', (req,res) => {
  const sql = "SELECT * FROM siswa"
  db.query(sql, (err,fields) => {
    if(err) throw err
    response(200,fields,"list siswa",res)
  })
})

app.get('/siswa/:nik', (req,res) => {
  const nik =  req.params.nik
  const sql = `SELECT * FROM siswa WHERE nik = ${nik}`
  db.query(sql,(err,fields) => {
  console.log(fields)
  })
  response(200,`detail siswa by id ${nik}`,'get detail siswa',res)
})

app.post('/siswa',(req,res) => {
  const {nik,namaLengkap,kelas} = req.body
const sql = `INSERT INTO siswa VALUE (${nik},${namaLengkap},${kelas})`
db.query(sql,(err,fields) => {
 console.log(fields)
})
res.send("ok")
//  response(200,"ini post","Succesfull",res)
})

app.put('/siswa',(req,res) => {
  response(200,"ini put",res)
})

app.delete('/siswa',(req,res) => {
  response(200,"ini delete",res)
})
app.listen(port, () => {
console.log(`server started  on port ${port}`)
});

