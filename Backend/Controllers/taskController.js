const Task = require("../models/Task");
const User = require("../models/User");

const getTasks = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "org_admin") {
      filter = {}; 
    } else if (req.user.role === "dept_head") {
      filter = { department: req.user.department }; 
    } else {
      filter = { assignedTo: req.user._id }; 
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email role department")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  try {
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    if (req.user.role === "dept_head" &&
      assignedUser.department !== req.user.department) {
      return res.status(403).json({
        message: "You can only assign tasks to members in your department",
      });
    }

    const task = await Task.create({
      title,
      description,
      department: req.user.department,
      assignedTo,
      createdBy: req.user._id,
      status: status || "todo",
    });

    const populated = await task.populate("assignedTo", "name email department");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.toString() === req.user._id.toString();
    const isOrgAdmin = req.user.role === "org_admin";
    const isDeptHead = req.user.role === "dept_head" &&
      task.department === req.user.department;

    if (!isAssigned && !isOrgAdmin && !isDeptHead) {
      return res.status(403).json({
        message: "Access denied. You are not authorized to update this task's status.",
      });
    }

    task.status = status;
    await task.save();
    await task.populate("assignedTo", "name email department");
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    if (req.user.role === 'dept_head' && 
        task.department !== req.user.department) {
      return res.status(403).json({
        message: "Access denied. You can only delete tasks in your department.",
      })
    }

    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getDashboardData = async (req, res) => {
  try {
    let filter = {}
    if (req.user.role === 'org_admin') filter = {}
    else if (req.user.role === 'dept_head') filter = { department: req.user.department }
    else filter = { assignedTo: req.user._id }

    const tasks = await Task.find(filter).populate('assignedTo', 'name email')

    const total = tasks.length
    const todo = tasks.filter(t => t.status === 'todo').length
    const inProgress = tasks.filter(t => t.status === 'in_progress').length
    const completed = tasks.filter(t => t.status === 'completed').length

    const deptCounts = {}
    tasks.forEach(t => {
      deptCounts[t.department] = (deptCounts[t.department] || 0) + 1
    })
    const barChartData = Object.entries(deptCounts).map(([dept, count]) => ({
      department: dept,
      count,
    }))

    const recentTasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .limit(5)

    res.status(200).json({
      stats: { total, todo, inProgress, completed },
      pieChartData: [
        { status: 'Todo', count: todo },
        { status: 'In Progress', count: inProgress },
        { status: 'Completed', count: completed },
      ],
      barChartData,
      recentTasks,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { getTasks, createTask, updateTaskStatus, deleteTask, getDashboardData }