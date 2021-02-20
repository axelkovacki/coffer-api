import DatabaseManager from '../../../config/database/Manager';

const { Schema, model } = DatabaseManager;

const ProjectSchema = new Schema({
    userId: String,
    name: String,
}, {
    timestamps: true
});

export default model('Project', ProjectSchema);
