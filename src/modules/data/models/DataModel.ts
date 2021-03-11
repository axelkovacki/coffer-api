import DatabaseManager from '../../../config/database/Manager';

const { Schema, model } = DatabaseManager;

const DataSchema = new Schema({
    userId: String,
    projectId: String,
    payload: Array
}, {
    timestamps: true
});

export default model('Data', DataSchema);
