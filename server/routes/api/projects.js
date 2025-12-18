const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Project = require('../../models/Project');

// @route    POST api/projects
// @desc     Create a new project
// @access   Private
router.post('/', auth, async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      user: req.user.id // Taken from the JWT by the Gatekeeper!
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/projects
// @desc     Get all projects for the logged-in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    // Find projects belonging to this user and sort by newest first
    const projects = await Project.find({ user: req.user.id }).sort({ date: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;