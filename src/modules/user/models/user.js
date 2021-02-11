const DatabaseManager = global.locator('config/database/manager');

const { Schema, model } = DatabaseManager;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  apiKey: String
}, {
  timestamps: true
});

module.exports = model('User', UserSchema);