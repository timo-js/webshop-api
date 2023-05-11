/*
  ADMIN MIDDLEWARE:
    Checks if the provided JSON Webtoken is authorized as admin, passes to next function if so
*/

module.exports = function (req, res, next) {
  if (req.user.groupname !== "Admin")
    return res.status(403).send("This operation can only be done by admins.");

  next();
};
