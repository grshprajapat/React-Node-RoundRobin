// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const TeamService = require('../service/TeamService');
const TeamMemberService = require('../service/TeamMemberService');

// Create a new team
// Create a new team
router.post('/teams', async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Name is required in the request body' });
      }
  
      const team = await TeamService.createTeam(name);
      res.status(201).json(team);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            // Handle duplicate team name error
            res.status(400).json({ error: 'Team name must be unique.' });
          } else {
            console.error(error);
            res.status(500).json({ error: 'Failed to create team' });
          }
    }
  });
  

// Create a new team member
router.post('/team-members', async (req, res) => {
  const { name, teamId } = req.body;

  try {
    const teamMember = await TeamMemberService.createTeamMember(name, teamId);
    res.status(201).json(teamMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

router.get('/teams', async (req, res) => {
    try {
      const teams = await TeamService.listTeams();
      res.json(teams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve teams' });
    }
  });

// Add other routes for listing, updating, and deleting teams and team members

module.exports = router;
