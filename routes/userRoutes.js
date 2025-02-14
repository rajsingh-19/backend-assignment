const express = require('express');
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const { registerHandler, loginHandler, infoHandler } = require("../controller/userController");

//      register route
router.post('/login', loginHandler);
router.post('/register', registerHandler);
router.get('/info/:email', verifyUser, infoHandler);

module.exports = router;
