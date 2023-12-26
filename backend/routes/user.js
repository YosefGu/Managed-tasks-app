const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { signupUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } = 
require('../controllers/userControllers');

const router = express.Router();


// signup route
router.post('/signup', signupUser);

// login route
router.post('/login', loginUser);

// authorization
router.use(requireAuth);

// GET all users
router.get('/users', getAllUsers);
  
// GET a single user
router.get('/:id', getUser);

//DELETE a user
router.delete('/:id', deleteUser);

//UPDATE a user
router.patch('/:id', updateUser);

module.exports = router