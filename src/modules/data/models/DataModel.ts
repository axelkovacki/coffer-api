import DatabaseManager from '../../../config/database/Manager';

const { Schema, model } = DatabaseManager;

const DataSchema = new Schema({
    userId: String,
    projectId: String
}, {
    strict: false,
    timestamps: true
});

export default model('Data', DataSchema);
