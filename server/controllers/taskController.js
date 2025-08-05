const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, user: req.user });
  await task.save();
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ msg: "Task deleted" });
};

exports.getAverageRating = async (req, res) => {
  const result = await Task.aggregate([
    { $match: { user: req.user } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } },
  ]);
  res.json(result[0] || { avgRating: 0 });
};
