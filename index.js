const express = require("express");
const bodyParser = require("body-parser");
let mysql = require("mysql");
const app = express();
const port = 3000;

// Use MYsql for DataConnection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Amit@123",
  database: "todi_list",
});
connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("connected to Mysql database");
  }
});

// sample table structure
const sql = `CREATE TABLE IF NOT EXISTS
todos(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
completed BOOLEAN DEFAULT FALSE
)
`;
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created(if it not already exist)");
});

app.use(bodyParser.json());
// create a new todo
app.post("/todos", (req, res) => {
  const newTodo = {
    title: req.body.title,
  };
  const sql = "INSERT INTO todos SET ?";
  connection.query(sql, newTodo, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, ...newTodo });
  });
});

// Get All todos
app.get("/todos", (req, res) => {
  const sql = "SELECT * FROM todos";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//Get A single todo by ID
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const sql = "SELECT * FROM todos WHERE id=?";
  connection.query(sql, [todoId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// Update a todo by Id
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;
  const sql = "UPDATE todos SET ? WHERE id=?";
  connection.query(sql, [updatedTodo, todoId], (err, result) => {
    if (err) throw err;
    if (result.affectRows === 0) {
      res.status(404).json({
        message: "Todo not found",
      });
    } else {
      res.status(200).json({ message: "Todo updated successfully" });
    }
  });
});


// Delete a todo by ID
app.delete('/todos/:id',(req,res)=>{
  const todoId =parseInt(req.params.id);
  const sql ='DELETE FROM todos WHERE id=?'
  connection.query(sql,[todoId],(err,result)=>{
    if(err) throw err;
    if(result.affectRows===0){
      res.status(404).json({message:"Todo Not Found"})
    }
    else{
      res.sendStatus(204)
    }
  })
})

//start server
app.listen(port,()=>{
  console.log(`server listening on the port ${port}`)
})