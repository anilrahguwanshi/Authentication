const express = require("express");
const authentication = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/profile", authentication, (req, res) => {
  const user = req.user;

  res.json({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  });
});


module.exports = router;
