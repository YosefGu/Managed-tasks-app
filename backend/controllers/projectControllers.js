const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// get all projects
const getAllProjects = async (req, res) => {
    const user_id = req.user._id;

    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// get a single project
const getProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal project id.'});   
    };
    const project = await Project.findById(id);
    if (!project) {
        return res.status(400).json({error: 'No such project in DB'})
    }
    res.status(200).json(project);
};

// create a new project
const createProject = async (req, res) => {
    const {title, description, users, tasks, author} = req.body;
    const user_id = req.user._id;
    
    try {
        let updateAuthor = [...author, user_id]
        let updateUsers = [...users, user_id]
        // if (!updateAuthor.includes(user_id)){
        //     updateAuthor.push(user_id)
        // }
        const project = await Project.create({title, description, users: updateUsers, tasks, author: updateAuthor});
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// delete project
const deleteProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal project id.'});   
    };
    const project = await Project.findByIdAndDelete({_id: id});
    if (!project) {
        return res.status(400).json({error: 'No such project in DB'})
    } 
    res.status(200).json(project);
}

// update project
const updateProject = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Illegal project id.'})
    };

    const project = await Project.findByIdAndUpdate({ _id:id}, {...req.body});
    if (!project) {
        res.status(400).json({error: 'No such project in DB'})
    };
    res.status(200).json(project)
};

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject
}