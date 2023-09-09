const Team = require('../models/team'); // Import your Team model

class TeamService {
  static async createTeam(name) {
    try {
      const team = await Team.create({ name });
      return team;
    } catch (error) {
      throw error;
    }
  }

  static async listTeams() {
    try {
      const teams = await Team.findAll();
      return teams;
    } catch (error) {
      throw error;
    }
  }

  // Add other methods for updating, deleting, and retrieving teams as needed
}

module.exports = TeamService;
