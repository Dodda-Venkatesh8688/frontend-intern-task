const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");

// Create Task
router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Task({ title, user: req.user.id });
    const task = await newTask.save();
    res.json(task);
  } catch(err) { res.status(500).send("Server error"); }
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch(err) { res.status(500).send("Server error"); }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch(err) { res.status(500).send("Server error"); }
});

module.exports = router;
