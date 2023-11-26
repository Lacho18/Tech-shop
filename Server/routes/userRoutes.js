const express = require('express');
const router = express.Router();
const userControler = require('../controller.js/userController.js');

router.route('/')
    .get(userControler.getAllUsers)
    .post(userControler.createNewUser)
    .patch(userControler.updateUser)
    .delete(userControler.deleteUser)

module.exports = router;

