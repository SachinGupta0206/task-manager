const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAverageRating,
} = require("../controllers/taskController");

const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/stats/average-rating", getAverageRating);

module.exports = router;
