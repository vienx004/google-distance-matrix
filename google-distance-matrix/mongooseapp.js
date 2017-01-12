var distance = require('google-distance');
var mongoose = require('mongoose');
var filters = require('json-property-filter');
var filter = new filters.JsonPropertyFilter(['origin', 'destination', 'distance', 'duration', '-distanceValue', '-durationValue'])

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

function getOrigin(callback) {
        MyModel.find({type:'Origin'}, function(err, response) {
        var result = [];
        for (var k in response) {
        result.push(response[k].address);
        }
        callback(result);
});
};

function getDestination(callback) {
        MyModel.find({type:'Destination'}, function(err, response) {
        var result = [];
        for (var k in response) {
        result.push(response[k].address);
        }
        callback(result);
});
};

//getOrigin(function(address) {
//    console.log("callback" + address);
//});

//getOrigin(function(address){});

function dosomething(callback){
    getOrigin(function(address){
        var origin = address;
        callback(origin);
    });
}

//dosomething(function(data) {
//    console.log("success" + data);
//});

//getDistance(function(data){
//    console.log("outside " + data);
//});

getDistance();

function getDistance(callback){
    getOrigin(function(address){
        var origin = address;
            getDestination(function(address2){
                var destination = address2;
                var options = {
                    origins: origin,
                    destinations: destination,
                    units: 'imperial'
                }
                    distance.get(options, 
                        function(err, data) {
                        if (err) return console.log(err);
                        console.log(filter.apply(data));
                        //callback(filter.apply(data));
                        });
            });
    });
};
//console.log(returnAddress);