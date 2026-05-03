const express = require("express");
const router = express.Router();
const { getTasks, createTask, updateTaskStatus, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", protect, getTasks);
router.post("/", protect, authorizeRoles("dept_head"), createTask);
router.patch("/:id/status", protect, updateTaskStatus);
router.delete("/:id", protect, authorizeRoles("org_admin"), deleteTask);

module.exports = router;