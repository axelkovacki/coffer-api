const DatabaseManager = global.locator('config/database/manager');

const { Schema, model } = DatabaseManager;

const LogSchema = new Schema({
  projectId: String,
  payload: Array
}, {
  timestamps: true
});

module.exports = model('Log', LogSchema);