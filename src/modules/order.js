import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
	{
		foods: [],
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		amount: { type: Number, required: true },
		orderId: { type: String, default: "soskcsc"},
		createdAt: { type: Date },
		state: { type: Number, default: 0},
	},
	{ timestamps: true }
);

export default model('Order', orderSchema);
