const User = require("../models/user.model");

const verifyUser = async (req, res, next) => {
  const userId = req.headers.token;

  if (userId) {
    const loggedUser = await User.findById(userId);
    if (loggedUser) {
      req.user = loggedUser;
      next();
    } else {
      return res.status(404).json("User does not exist");
    }
  } else {
    return res.status(401).json("you are not authorized to access this route");
  }
};

module.exports = { verifyUser };
