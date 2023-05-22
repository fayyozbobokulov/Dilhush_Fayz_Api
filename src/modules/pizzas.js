import { Schema, model } from 'mongoose';

const pizzasSchema = new Schema(
	{
		title: { type: String, required: true },
		amount: { type: String, required: true },
		img: { type: String, required: true },
		price: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default model('Pizza', pizzasSchema);
