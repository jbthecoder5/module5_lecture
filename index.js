const express = require("express");

const app = express();

app.use(express.static("./public"));
app.use(express.json());

// Creating an array that acts as a database for not until we learn about MongoDB
let todoItems = [
  { _id: 1, task: "Attend CS157 Lecture." },
  { _id: 2, task: "Learn about Express" }
];

// The 4 CRUD operations for this Task App (Create, Read, Update, Delete) 
// (POST, GET, PAPTCH, DELETE)

// GET (Read All Tasks)
app.get("/api/todos", (req, res) => {
  res.status(200).send(todoItems);
});

// GET (Read One Task)
app.get("/api/todos/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let foundItem = todoItems.find((item) => item._id === id);
  if (foundItem) {
    res.status(200).send(foundItem);
  }
  else {
    res.status(404).send("Item does not exist!");
  }
});

// POST (New Task)
app.post("/api/todos", (req, res) => {
  let newTask = req.body;
  // Adding a new task to the array

  if (newTask.task) {
    newTask._id = todoItems.length + 1;
    todoItems.push(newTask);

    res.status(201).send(newTask);
  }
  else {
    res.status(400).send("Task is required!");
  }
})

// PATCH (Update Task)
app.patch("/api/todos/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let foundItem = todoItems.find((item) => item._id === id);
  if (foundItem) {
    foundItem.task = req.body.task;
    res.status(200).send(foundItem);
  }
  else {
    res.status(404).send("That task item was not found!");
  }
})


// DELETE (Delete Task)
app.delete("/api/todos/:id", (req, res) => {
  let id = parseInt(req.params.id);

  let foundItem;

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i]._id === id) {
      foundItem = todoItems.splice(i, 1)[0]
    }
  }

  if (foundItem) {
    res.status(200).send(foundItem);
  }
  else {
    res.status(400).send("That item does not exist!");
  }
})


app.listen(3000);