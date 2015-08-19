var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var range_model = new Schema({
	name: String,
	address: String,
	city: String,
	state: String,
	zip: String,
	phone: String,
	website: String
}, { collection: 'Ranges'});

var Range = mongoose.model('Ranges', range_model);
module.exports = Range;