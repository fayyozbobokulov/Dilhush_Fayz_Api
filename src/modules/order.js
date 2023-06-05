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
		orderNumber: { type: Number, default: 1 },
		createdAt: { type: BigInt },
		state: { type: Number },
	},
	{ timestamps: true }
);

export default model('Order', orderSchema);
