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
   
    // Fetch all team members for the selected team, ordered by priority in ascending order.
    const teamMembers = await TeamMember.findAll({
      where: { teamId },
      order: [['priority', 'ASC']],
    });

    if (teamMembers.length === 0) {
      throw new Error('No team members available for this team');
    }

    // Determine the next team member to assign the task to based on priority.
    let nextAssignee = null;

    for (const teamMember of teamMembers) {
      if (
        !await Task.findOne({
          where: {
            assignee: teamMember.name,
            teamId: teamId,
          },
        })
      ) {
        nextAssignee = teamMember;
        break;
      }
    }

    if (!nextAssignee) {
      throw new Error('All team members for this team have tasks assigned');
      // If all team members have tasks assigned to this team, assign the task to the highest-priority member.
      // nextAssignee = teamMembers[0];
    }

    await Task.create({ description, teamId });

    // Find the next unassigned task for the selected team.
    const unassignedTask = await Task.findOne({
      where: { assignee: null, teamId },
      order: [['createdAt', 'ASC']],
    });

    if (!unassignedTask) {
      throw new Error('No unassigned tasks available');
    }

    // Assign the task to the next team member and update the task's assignee.
    unassignedTask.assignee = nextAssignee.name;


    // Save the task to update the assignee.
    await unassignedTask.save();

    console.log({ message: 'Task assigned successfully' ,unassignedTask});

    return unassignedTask;
  } catch (error) {
    console.log({ error: error.message });
    throw error; // Re-throw the error to handle it elsewhere if needed.
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
