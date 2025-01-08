const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	from: {
		type: Object,
		required: true
	},
	chat: {
		type: Object,
		required: true
	},
	message_id: {
		type: Number,
		required: true
	},
	date: {
		type: Number,
		required: true
	},
	entities: {
		type: Array
	},
	text: {
		type: String,
		required: true
	},
	_dt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Messages', itemSchema);
