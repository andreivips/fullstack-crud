const express = require('express');
const router = express.Router();
const userC = require("../controllers/user-controller.js");

router.get('/', userC.getAllUsers);

router.get('/:id', userC.getUserById);

router.post('/', userC.createUser);

router.put('/:id', userC.updateUserById);

router.delete('/:id', userC.deleteUserById);

module.exports = router;
