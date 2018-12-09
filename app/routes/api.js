var AdminUser = require('../models/adminUser');
var UserFeedback = require('../models/userFeedback');
var jwt = require('jsonwebtoken');
var secret = 'assignment2018';
var multer = require('multer');

var publicPaths = ['/', '/userFeedback', '/authenticate'];

module.exports = function (router) {


    /**
     * read token on each request
     */
    router.use(function (req, res, next) {

        if (publicPaths.includes(req.path)) {
            return next();
        }

        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (!token) {
            res.json({success: false, message: 'No token provided'});
            return;
        }

        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.json({success: false, message: 'Invalid token'});
                return;
            }

            req.decoded = decoded;
            next();
        });
    });

    router.post('/userInfo', function (req, res) {
        res.send(req.decoded);
    });

    /**
     * log in user & assign token
     */
    router.post('/authenticate', function (req, res) {
        AdminUser.findOne({username: req.body.username}).select('username password').exec(function (err, adminUser) {
            if (err) throw err;

            if (!adminUser) {
                res.json({success: false, message: 'User doesn\'t exist'});
                return;
            }

            if (!req.body.password || !adminUser.comparePassword(req.body.password)) {
                res.json({success: false, message: 'Incorrect Password'});
                return;
            }

            var token = jwt.sign({username: adminUser.username}, secret, {expiresIn: '24h'});

            res.json({success: true, message: 'OK', token: token});
        })
    });

    //

    //

    //

    /**
     * Upload images & Insert UserFeedback
     */
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/');
        },
        filename: function (req, file, cb) {
            if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
                var err = new Error();
                err.code = 'filetype';
                return cb(err);
            }

            cb(null, Date.now() + '_' + file.originalname);
        }
    });
    var upload = multer({
        storage: storage
    }).array('images', 3);
    router.post('/userFeedback', function (req, res) {
        upload(req, res, function (err){
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.json({success: false, message: 'File size must be below 10MB'});
                } else if (err.code === 'filetype') {
                    res.json({success:false, message: 'File type must be .png .jpeg or .jpg'});
                } else {
                    res.json({success: false, message: 'Error in uploading file'});
                }
                return;
            }

            var uploadedFilePaths = null;

            //append file paths to make it retrievable
            if (req.files) {
                uploadedFilePaths = [];
                for (var i = 0; i < req.files.length; i++) {
                    uploadedFilePaths.push(req.files[i].path.replace('public\\uploads\\', 'uploads\\').replace('public/uploads/', 'uploads/'));
                }
            }

            var userFeedback = new UserFeedback();
            userFeedback.email = req.body.email;
            userFeedback.content = req.body.content;
            userFeedback.uploadedFilePaths = uploadedFilePaths;

            userFeedback.save(function (err) {
                if (err) {
                    res.json({success: false, message: 'Error in creating feedback.'});
                    return;
                }

                res.json({success: true, message: 'Your feedback has been received. Thank you for your feedback.'});
            });
        });
    });

    /**
     * find all UserFeedbacks
     */
    router.get('/userFeedback', function (req, res) {
        UserFeedback.find({}, function(err, feedbacks) {
            res.json({success: true, feedbacks: feedbacks});
        });
    });

    /**
     * find one UserFeedback
     */
    router.get('/userFeedback/:id', function (req, res) {
        UserFeedback.findOne({_id: req.params.id}, function(err, feedback) {
            res.json({success: true, feedback: feedback});
        });
    });

    return router;
};


//"d:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\data\db"