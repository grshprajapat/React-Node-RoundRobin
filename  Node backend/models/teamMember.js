// models/TeamMember.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TeamMember = sequelize.define(
  'teamMember',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  
);

module.exports = TeamMember;
