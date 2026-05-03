const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "dept_head") {
      filter = { department: req.user.department };
    }
    const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.role === "dept_head" &&
      user.department !== req.user.department) {
      return res.status(403).json({
        message: "You can only manage users in your own department",
      });
    }

    user.role = role;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserDepartment = async (req, res) => {
  const { department } = req.body;
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.role === "dept_head" &&
      user.department !== req.user.department) {
      return res.status(403).json({
        message: "You can only manage users in your own department",
      });
    }

    user.department = department;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, updateUserRole, updateUserDepartment };