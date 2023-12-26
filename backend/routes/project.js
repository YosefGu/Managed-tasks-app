const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getAllProjects, getProject, createProject, deleteProject, updateProject} =
 require('../controllers/projectControllers');

const router = express.Router();


// authorization
router.use(requireAuth);

// GET all project
router.get('/projects', getAllProjects);
  
// GET a single project
router.get('/:id', getProject);

// POST a new project
router.post('/create', createProject);

//DELETE a project
router.delete('/:id', deleteProject);

//UPDATE a project
router.patch('/:id', updateProject);

module.exports = router