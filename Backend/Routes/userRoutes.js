const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserRole, updateUserDepartment } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/", protect, authorizeRoles("dept_head", "org_admin"), getAllUsers);
router.patch("/:id/role", protect, authorizeRoles("dept_head"), updateUserRole);
router.patch("/:id/department", protect, authorizeRoles("dept_head"), updateUserDepartment);

module.exports = router;