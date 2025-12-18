const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Chapter = require('../../models/Chapter');
const Project = require('../../models/Project');

// @route    POST api/chapters/:projectId
// @desc     Add a chapter to a project
// @access   Private
router.post('/:projectId', auth, async (req, res) => {
  try {
    // 1. Verify that the project exists and belongs to the user
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // 2. Create the new chapter
    const newChapter = new Chapter({
      title: req.body.title,
      content: req.body.content,
      chapterNumber: req.body.chapterNumber,
      project: req.params.projectId
    });

    const chapter = await newChapter.save();
    res.json(chapter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/chapters/:projectId
// @desc     Get all chapters for a specific project
// @access   Private
router.get('/:projectId', auth, async (req, res) => {
  try {
    // 1. Ensure the project exists and belongs to the user
    const project = await Project.findById(req.params.projectId);
    if (!project || project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // 2. Find chapters and sort by chapter number
    const chapters = await Chapter.find({ project: req.params.projectId }).sort({ chapterNumber: 1 });
    res.json(chapters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/chapters/:chapterId
// @desc     Update a chapter (content or AI feedback)
// @access   Private
router.put('/:chapterId', auth, async (req, res) => {
  try {
    const { title, content, aiGrade, aiSuggestions } = req.body;

    const chapterFields = {};
    if (title) chapterFields.title = title;
    if (content) chapterFields.content = content;
    if (aiGrade !== undefined) chapterFields.aiGrade = aiGrade;
    if (aiSuggestions) chapterFields.aiSuggestions = aiSuggestions;

    let chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) return res.status(404).json({ msg: 'Chapter not found' });

    // Find the project associated with this chapter
    const project = await Project.findById(chapter.project);
    
    // SAFETY CHECK: If project is null, the chapter is orphaned
    if (!project) {
      return res.status(404).json({ msg: 'Associated project not found' });
    }

    // Compare user IDs
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    chapter = await Chapter.findByIdAndUpdate(
      req.params.chapterId,
      { $set: chapterFields },
      { new: true }
    );

    res.json(chapter);
  } catch (err) {
    console.error("CRASH ERROR:", err.message); // This will print the exact error to your terminal
    res.status(500).send('Server Error');
  }
});

module.exports = router;