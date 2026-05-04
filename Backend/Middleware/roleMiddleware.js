const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Your role '${req.user.role}' is not authorized for this action.`,
      });
    }
    next();
  };
};
const checkDepartment = (req, res, next) => {
  if (req.user.role === "org_admin") return next();
  if (req.user.department !== req.resource?.department) {
    return res.status(403).json({
      message: "Access denied. You can only access your own department's resources.",
    });
  }
  next();
};

module.exports = { authorizeRoles, checkDepartment };