const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Messages', itemSchema);
