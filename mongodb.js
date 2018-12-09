var mongoose = require('mongoose');
var mongodbPort = 27017;

mongoose.connect('mongodb://localhost:' + mongodbPort + '/ZyggyLauLavaMapAssignment', {
    useNewUrlParser: true,
    useCreateIndex: true
}, function (err) {
    if (err) {
        console.error('Not Connected to MongoDB: \n' + err);
        throw err;
    }
    console.log('Connected to MongoDB');
});
