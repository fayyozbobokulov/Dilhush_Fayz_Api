import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
	{
		foods: [Object],
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
	},
	{ timestamps: true }
);

export default model('Order', orderSchema);
