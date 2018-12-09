var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var AdminUser = require('./app/models/adminUser');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

require('./mongodb');

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(port, function () {
    console.log('Running on port ' + port);
});

var createDefaultAdminUser = function () {
    AdminUser.findOne({username: 'admin'}).select('username').exec(function (err, adminUser) {
        if (!adminUser) {
            adminUser = new AdminUser();
            adminUser.username = 'admin';
            adminUser.password = 'admin';
            adminUser.save();

            console.log('Created default admin user (username: "admin", password: "admin")');
        }
    })
};
createDefaultAdminUser();