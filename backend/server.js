import express from "express";
import fs from "fs"
const TASK_FILE = "tasks.json";

const app = express();
app.use(express.json());

const PORT = 5000;

function getTasks() {
  return JSON.parse(fs.readFileSync(TASK_FILE, "utf-8"));
}

function saveTasks(tasks) {
  fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, 2));
}

app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API"
  });
});

app.get("/tasks", (req, res) => {
  const tasks = getTasks();

  res.json(tasks)
})

app.post("/tasks", (req, res) => {
  const tasks = getTasks();

  const task = {
    id: Date.now(),
    title: req.body.title
  };

  tasks.push(task);

  saveTasks(tasks);

  res.status(201).json(task);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});