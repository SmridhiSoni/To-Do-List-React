const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_restapi'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected with App...');
});

app.get('/api/items/:id',(req, res) => {
    let sqlQuery = "SELECT * FROM dolist WHERE id=" + req.params.id;
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  app.get('/api/get', (req,res) => {
    let sqlQuery = "SELECT * FROM dolist";

    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(results);
    });
  });

  app.post("/api/items", (req, res) => {
    let data = { note: req.body.note};
  
    let sqlQuery = "INSERT INTO dolist SET ?";
  
    let query = conn.query(sqlQuery, data, (err, results) => {
      if (err) throw err;
      res.send(apiResponse(results));
    });
  });
  
  app.put('/api/items/:id',(req, res) => {
    let sqlQuery = "UPDATE dolist SET note='"+req.body.note+"' WHERE id="+req.params.id;
    
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });


  app.delete('/api/items/:id',(req, res) => {
    let sqlQuery = "DELETE FROM dolist WHERE id="+req.params.id+"";
      
    let query = conn.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

  function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});