import Payment from '../modules/payment.js';
import Order from '../modules/order.js';

// Get Method
export const getDrinks = async (req, res) => {
	try {
		const drinks = await Drinks.find();
		!drinks && res.status(500).json({ message: 'not found', data: false });
		res
			.status(200)
			.json({ message: 'successfully get are drinks', data: drinks });
	} catch (error) {
		console.log(error.message);
	}
};

// Get Method By Id
export const getByIdDrink = async (req, res) => {
	try {
		const drink = await Order.findById(req.params.id);
		!drink && res.status(500).json({ message: 'not found', data: false });
		res
			.status(200)
			.json({ message: 'successfully get are drink', data: drink });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

async function CheckTransaction(req, res) {
	try {
		const { method, params } = req.body;
		const { order_id } = params;

		if (method !== 'CheckTransaction') throw new Error('32504');

		const findOrder = await Order.findOne({ orderNumber: order_id });

		if (!findOrder) throw new Error('31003');

		return res.json({
			result: {
				create_time: 1111,
				perform_time: 1111,
				cancel_time: 0,
				transaction: order_id,
				state: 1,
				reason: null,
			},
		});
	} catch (error) {
		const message = error.message;
		const result = {};

		if (message == 32504) result.error = 'method not found';
		else if (message == 31003) result.error = 'order not found';
		else result.error = 'internal error';
		return res.json({ error: error.message });
	}
}

export const Handler = async (req, res) => {
	const { method } = req.body;
	if (method === 'CheckTransaction') CheckTransaction(req, res);
	else if (method === 'CheckPerformTransaction') CheckTransaction(req, res);
	else if (method === 'CheckTransaction') CheckTransaction(req, res);
	else if (method === 'CheckTransaction') CheckTransaction(req, res);
	else if (method === 'CheckTransaction') CheckTransaction(req, res);
	else res.json({ error: 'method not found' });
};
