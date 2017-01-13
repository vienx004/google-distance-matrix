var distance = require('google-distance');
var filters = require('json-property-filter');

var filter = new filters.JsonPropertyFilter(['origin', 'destination', 'distance', 'duration', '-distanceValue', '-durationValue'])
var Originpath = '\CVS.txt';
var Destinationpath = '\Destinations.txt';

var fs = require('fs');
var Originarray = fs.readFileSync(Originpath).toString().split('\r\n');
var Destinationarray = fs.readFileSync(Destinationpath).toString().split('\r\n');

distance.get(
    {
        origins: Originarray,
        destinations: Destinationarray,
        units: 'imperial'
    },

    function(err, data) {
        if (err) return console.log(err);
        console.log(filter.apply(data));
    });