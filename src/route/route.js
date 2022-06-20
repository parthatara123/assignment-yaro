const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router.get("test", (req, res) => {
  res.send("Test API");
});

router.post("/user", UserController.newUserRegistration);
router.post("/checkUser", UserController.checkUser);

module.exports = router;
