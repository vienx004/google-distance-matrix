var distance = require('google-distance');
var mongoose = require('mongoose');
var origin_address = '';
var destination_address;

mongoose.connect('mongodb://localhost/addresses');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var addresses = new Schema({
    ObjectId:   ObjectId,
    address:    String,
    latitude:   Number,
    longitude:  Number,
    type:       String
});

var MyModel = mongoose.model('addresses', addresses)

MyModel.find({type:'Origin'}, function(err, response) {

        origin_address = response[0].address
        console.log(origin_address);
});

