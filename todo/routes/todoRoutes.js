const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// GET all todos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo_schema.todos");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// POST a new todo
router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo_schema.todos (task) VALUES($1) RETURNING *",
      [task]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// PUT (update) a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo_schema.todos SET task = $1, completed = $2 WHERE id = $3 RETURNING *",
      [task, completed, id]
    );
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo_schema.todos WHERE id = $1", [id]);
    res.json({ message: "Todo was deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
