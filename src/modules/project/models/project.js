const DatabaseManager = global.locator('config/database/manager');

const { Schema, model } = DatabaseManager;

const ProjectSchema = new Schema({
  userId: String,
  name: String,
}, {
  timestamps: true
});

module.exports = model('Project', ProjectSchema);
