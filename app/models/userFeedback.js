var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserFeedbackSchema = new Schema({
    // _id: {type: Number, required: true},
    email: {type: String, required: true},
    content: {type: String, required: true},
    uploadedFilePaths: {type: [String], required: false},
    submissionDate: {type: Date, default: Date.now}
});


module.exports = mongoose.model('UserFeedback', UserFeedbackSchema);