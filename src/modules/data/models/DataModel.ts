import DatabaseManager from '../../../config/database/Manager';

const { Schema, model } = DatabaseManager;

const DataSchema = new Schema({
    projectId: String,
    payload: Array
}, {
    timestamps: true
});

export default model('Data', DataSchema);
