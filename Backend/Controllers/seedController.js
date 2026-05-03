const User = require("../models/User");
const Task = require("../models/Task");

const seedData = async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});

    const users = await User.create([
      { name: "Alice", email: "alice@test.com", password: "123456",
        role: "org_admin", department: "engineering" },
      { name: "Bob", email: "bob@test.com", password: "123456",
        role: "dept_head", department: "engineering" },
      { name: "Charlie", email: "charlie@test.com", password: "123456",
        role: "member", department: "engineering" },
      { name: "Diana", email: "diana@test.com", password: "123456",
        role: "dept_head", department: "design" },
      { name: "Eve", email: "eve@test.com", password: "123456",
        role: "member", department: "design" },
      { name: "Frank", email: "frank@test.com", password: "123456",
        role: "member", department: "engineering" },
    ]);

    await Task.create([
      {
        title: "Fix login bug",
        description: "Login page throws error",
        department: "engineering",
        assignedTo: users[2]._id, 
        createdBy: users[1]._id, 
        status: "in_progress",
      },
      {
        title: "Design new landing page",
        description: "Create new landing page design",
        department: "design",
        assignedTo: users[4]._id, 
        createdBy: users[3]._id, 
        status: "todo",
      },
      {
        title: "API refactor",
        description: "Refactor the API endpoints",
        department: "engineering",
        assignedTo: users[5]._id, 
        createdBy: users[1]._id, 
        status: "completed",
      },
    ]);

    res.status(200).json({
      message: " Seed data created successfully!",
      users: users.map(u => ({
        name: u.name,
        email: u.email,
        role: u.role,
        department: u.department,
        password: "123456"
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { seedData };