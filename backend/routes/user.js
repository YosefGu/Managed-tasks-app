const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { signupUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } = 
require('../controllers/userControllers');

const router = express.Router();

router.use(requireAuth);

// signup route
router.post('/signup', signupUser);

// login route
router.post('/login', loginUser)

// GET all users
router.get('/users', getAllUsers);
  
// GET a single user
router.get('/:id', getUser);

//DELETE a note
router.delete('/:id', deleteUser);

//UPDATE a note
router.patch('/:id', updateUser);

module.exports = router