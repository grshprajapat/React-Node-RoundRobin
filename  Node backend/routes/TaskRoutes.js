// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const TaskService = require('../service/TaskService');

// Create a new task
router.post('/', async (req, res) => {
  const { description, teamId } = req.body;

  try {
    const task = await TaskService.createTask(description, teamId);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});


// router.get('/getTasks', (req, res) => {
//     const tasks = TaskService.getTasks();
//     res.json(tasks);
//   });

// // Assign a task to a team member
// router.put('/assign', async (req, res) => {
//     try {
//       const task = await TaskService.assignTaskRoundRobin();
//       res.json(task);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to assign task' });
//     }
//   });



module.exports = router;
