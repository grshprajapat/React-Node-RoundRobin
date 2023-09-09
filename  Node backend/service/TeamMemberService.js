// services/TeamMemberService.js
const TeamMember = require('../models/teamMember');

class TeamMemberService {
  static async createTeamMember(name, teamId) {
    try {
      const teamMember = await TeamMember.create({ name, teamId });
      return teamMember;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TeamMemberService;
