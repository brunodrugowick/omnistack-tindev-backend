const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const DeveloperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
        unique: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
    }],
}, {
    timestamps: true,
});

DeveloperSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Developer', DeveloperSchema);

// Export defaults
// module.exports = {
//     'DEFAULT_SORTFIELD': 'name',
//     'DEFAULT_SORTTYPE': 'asc'
// }