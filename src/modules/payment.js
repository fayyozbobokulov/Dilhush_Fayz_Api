const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
	cartNumber: { type: String, limit: 16, required: true },
	dateNumber: { type: Number, limit: 4, required: true },
	cardHolderName: { type: String, required: true },
});

export default model('Payment', paymentSchema);
