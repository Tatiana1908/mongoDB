var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var router = express.Router();

var Cat = new Schema({
    breed : String,
    color:  String,
    date_of_birth: Number,
    price: Number,
    modified: {
        type    : Date,
        default : Date.now
    }
}, {collection: 'cats'});
var CatData = mongoose.model('CatData', Cat);

// GET method
router.get('/', function(req, res, next) {
    CatData.find()
        .then( doc => {
            res.send(doc)
        })
        .catch( () => {
            let err = new Error("NOT FOUND")
            err.status = 404;
            next(err);
        })
    })

// GET method by id
router.get('/:id', function(req, res, next) {
    CatData.find({_id: parseInt(req.params.id) })
        .then( cat => {
            res.send(cat)
        })
        .catch( () => {
            let err = new Error("NOT FOUND")
            err.status = 404;
            next(err);
        })
})

//POST method
router.post('/', function(req, res, next) {
    var newCat = {...req.body}
    var data = new CatData(newCat);
    data.save()
    res.send(data)
})

//DELETE method
router.delete('/:id', function(req, res, next) {
    CatData.find({_id: req.params.id}).remove()
        .then( () => {
            res.send("removed")
            res.redirect('/')
        })
        .catch( () => {
            let err = new Error("NOT FOUND")
            err.status = 404;
            next(err);
        })
})
router.put('/:id',  function(req, res, next) {
    CatData.find({_id: parseInt(req.params.id) }).remove()
        .then( () => {
            var newCat = {...req.body, id: req.params.id}
            var data = new CatData(newCat);
            data.save()
            res.send(data)
        })
        .catch( () => {
            let err = new Error("NOT FOUND")
            err.status = 404;
            next(err);
        })
})

module.exports = router;