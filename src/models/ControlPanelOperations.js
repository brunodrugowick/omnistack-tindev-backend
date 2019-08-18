const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ControlPanelOperationsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

ControlPanelOperationsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ControlPanelOperations', ControlPanelOperationsSchema);

// Export defaults
// module.exports = {
//     'DEFAULT_SORTFIELD': 'createdAt',
//     'DEFAULT_SORTTYPE': 'asc'
// }