import DatabaseManager from '../../../config/database/Manager';

const { Schema, model } = DatabaseManager;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    apiKey: String,
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

export default model('User', UserSchema);
