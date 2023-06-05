import Order from '../modules/order.js';

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
				foods: [{ img: req.file.filename, ...req.body }],
				userId: req.user._id.toString(),
				amount: req.body.amount,
			});
			await ord.save();
			res.status(200).json({ message: 'successfully Created', data: ord });
		}
		const newOrder = await Order.findByIdAndUpdate(
			{ _id: order._id },
			{
				$push: {
					foods: { img: req.file.filename, ...req.body },
					amount: req.body.amount,
				},
			},
			{ new: true }
		);
		!newOrder &&
			res.status(500).json({
				message: 'Order not found',
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
