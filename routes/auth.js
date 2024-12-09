const express = require("express");
const {
  register,
  login,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
router.get("/user/:id", getUser);
router.get("/users", getUsers);

module.exports = router;
