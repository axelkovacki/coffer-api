const { Schema, model } = require('mongoose');

const LogSchema = new Schema({
  projectId: String,
  payload: Array
}, {
  timestamps: true
});

module.exports = model('Log', LogSchema);