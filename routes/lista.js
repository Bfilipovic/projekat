var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('lista');
});

router.get('/get-data', function(req, res, next) {
    var resultArray = [];
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('user-data').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('lista', {items: resultArray});
        });
    });
});





router.post('/delete', function(req, res, next) {
    var id = req.body.id;

    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
            assert.equal(null, err);
            db.close();
        });
    });
});

module.exports = router;
/**
 * Created by Bronarchyst on 09/08/2016.
 */
