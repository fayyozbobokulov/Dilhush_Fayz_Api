import { Schema, Types } from 'mongoose';
import Order from '../modules/order.js';
import { ObjectId } from 'mongodb';

export const getOrder = async (req, res) => {
	try {
		const order = await Order.findOne({ userId: req.user._id });
		!order && res.status(500).json({ message: 'Order is impty' });
		res
			.status(200)
			.json({ message: 'successfully get All is data', data: order.foods });
	} catch (e) {
		res.status(500).json({
			message: 'Order is impty',
			data: false,
		});
	}
};

export const addOrder = async (req, res) => {
	try {
		const order = await Order.findOne({ userId: req.user._id });
		if (!order) {
			const ord = new Order({
				foods: [req.body],
				userId: req.user._id.toString(),
			});
			await ord.save();
			res.status(200).json({ message: 'successfully Created', data: ord });
		}
		const newOrder = await Order.findByIdAndUpdate(
			{ _id: order._id },
			{ $push: { foods: req.body } },
			{ new: true }
		);
		!newOrder &&
			res.status(500).json({
				message: 'Is not a group',
				data: false,
			});
		res.status(200).json({ message: 'Successfully updated', data: newOrder });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// const newFood = await Order.findByIdAndUpdate(
// 	{ _id: order._id },
// 	{
// 		$set: {
// 			foods: newOrder,
// 		},
// 	},
// 	{ new: true, useFindAndModify: false }
// );

// !newFood &&
// 	res.status(500).json({
// 		message: 'Is not a order',
// 		data: false,
// 	});
// res.status(200).json({ message: 'Successfully Add to Order', data: newFood });
