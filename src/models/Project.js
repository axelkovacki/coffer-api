const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
  userId: String,
  name: String,
}, {
  timestamps: true
});

module.exports = model('Project', ProjectSchema);