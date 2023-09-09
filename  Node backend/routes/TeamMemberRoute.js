const express = require('express');
const router = express.Router();
const TeamMemberService = require('../service/TeamMemberService'); // Import your TeamMemberService

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

// Add other routes for listing, updating, and deleting team members as needed

module.exports = router;
