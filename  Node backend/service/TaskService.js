// services/TaskService.js
const Task = require('../models/task');
const Team = require('../models/team');
const TeamMember = require('../models/teamMember');

class TaskService {
  static async createTeam(name) {
    try {
      const team = await Team.create({ name });
      return team;
    } catch (error) {
      throw error;
    }
  }

  static async createTask(description, teamId) {
     try {
      // Create the task with the given description and team ID
      const task = await Task.create({ description, teamId });

      // Fetch all team members for the selected team
      const teamMembers = await TeamMember.findAll({ where: { teamId } });

      if (teamMembers.length === 0) {
        throw new Error('No team members available for this team');
      }

      // Find the next unassigned task for the selected team
      const unassignedTask = await Task.findOne({ where: { assignee: null, teamId } });

      if (!unassignedTask) {
        throw new Error('No unassigned tasks available');
      }

      // Determine the next team member to assign the task to in a round-robin manner
      const nextAssigneeIndex = unassignedTask.id % teamMembers.length;
      const nextAssignee = teamMembers[nextAssigneeIndex];

      // Assign the task to the next team member
      unassignedTask.assignee = nextAssignee.name;
      await unassignedTask.save();

      return unassignedTask;
    } catch (error) {
      throw error;
    }
  }


  



  

  static async assignTaskRoundRobin() {
    try {
      // Fetch all team members and tasks
      const teamMembers = await TeamMember.findAll();
      const tasks = await Task.findAll({ where: { assignee: null } });

      if (tasks.length === 0) {
        throw new Error('No unassigned tasks available');
      }

      // Determine the next team member to assign the task to in a round-robin manner
      const nextAssigneeIndex = tasks.length % teamMembers.length;
      const nextAssignee = teamMembers[nextAssigneeIndex];

      // Assign the task to the next team member
      const taskToAssign = tasks[0];
      taskToAssign.assignee = nextAssignee.name;
      await taskToAssign.save();

      return taskToAssign;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskService;
