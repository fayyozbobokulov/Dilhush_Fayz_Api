const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
	foods: [
		{
			food: {
				type: Object,
				required: true,
			},
			count: {
				type: Number,
				required: true,
			},
		},
	],
	user: {
		fullName: { type: String },
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
});

export default model('Order', orderSchema);
