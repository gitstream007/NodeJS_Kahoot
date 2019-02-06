let express = require('express'),
    router = express.Router();

let usersController = require('./../controllers/usersController');

// List users
router.get('/users/list', usersController.list_users);

// Create user
router.post('/users/create', usersController.create_users);

// Edit user
router.post('/users/edit/:user_id', usersController.edit_users);

// Delete user
router.post('/users/delete/:user_id', usersController.delete_users);
module.exports = router;