const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
  res.json({
    firstName: "MJ",
  });
});

app.get("/todos", async (req, res) => {
  const data = await fs.readFile("todo.txt", "utf-8");
  if (data === "") {
    res.status(204).json([]);
    return;
  }
  const todos = data.split("\n");
  todos.pop();

  const result = todos.map((todo) => {
    const hyphenIndex = todo.indexOf(":");
    return {
      id: todo.slice(0, hyphenIndex),
      text: todo.slice(hyphenIndex + 1),
    };
  });

  res.status(200).json(result);
});

app.get("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const data = await fs.readFile("todo.txt", "utf-8");
  const todos = data.split("\n");
  todos.pop();

  for (const todo of todos) {
    const hyphenIndex = todo.indexOf(":");
    if (todo.slice(0, hyphenIndex) === todoId) {
      res.status(200).json({
        id: todoId,
        text: todo.slice(hyphenIndex + 1),
      });
      return;
    }
  }

  res.status(404).json({ error: "Todo not found" });
});

app.post("/todos", async (req, res) => {
  const body = req.body;
  console.log(body);
  const text = body["text"];
  const newUuid = uuidv4();
  const newTodo = newUuid + ":" + text;

  try {
    await fs.appendFile("todo.txt", `${newTodo}\n`);
    res.status(201).json({ id: newUuid });
  } catch (err) {
    console.error("Error occured - ", err);
    res.status(500).json({ error: "Error occurred while adding todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  let data;
  try {
    data = await fs.readFile("todo.txt", "utf-8");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
  const todos = data.split("\n");
  todos.pop();

  const newTodos = todos.filter((todo) => {
    const hyphenIndex = todo.indexOf(":");
    return todo.slice(0, hyphenIndex) !== todoId;
  });

  let combinedTodo;
  if (newTodos.length === 0) {
    combinedTodo = "";
  } else {
    combinedTodo = newTodos.join("\n");
    combinedTodo += "\n";
  }

  try {
    await fs.writeFile("todo.txt", combinedTodo);
    res.status(204).send();
  } catch {
    console.error("Error occured - ", err);
    res.status(500).json({ error: "Error occurred while deleting todo" });
  }
  return;
});

app.put("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const data = await fs.readFile("todo.txt", "utf-8");
  const todos = data.split("\n");
  if (todos.length === 0) {
    res.status(404).json({ error: "Todo with given id not found" });
    return;
  }
  const newText = req.body["text"];

  todos.forEach((todo, i) => {
    const hyphenIndex = todo.indexOf(":");
    if (todo.slice(0, hyphenIndex) === todoId) {
      todos[i] = todoId + ":" + newText;
    }
  });

  let combinedTodo = todos.join("\n");
  combinedTodo += "\n";
  try {
    await fs.writeFile("todo.txt", combinedTodo);
    res.status(204).send();
  } catch {
    console.error("Error occured - ", err);
    res.status(500).json({ error: "Error occurred while updating todo" });
  }
});

app.listen(3001);
