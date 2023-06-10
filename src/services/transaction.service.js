import User from '../modules/users.js';
import Order from '../modules/order.js';
import Transaction from '../modules/transaction.js';
import { PaymeError, TransactionState } from '../enums/transaction.enums.js';

const checkPerformTransaction = async (params) => {
	const { account, amount } = params;

	const user = await User.findOne({ userId: account.user_id });
	if (!user) {
		return PaymeError.UserNotFound;
	}
	const product = await Order.findOne({ orderId: account.order_id });
	if (!product) {
		return PaymeError.ProductNotFound;
	}

	if (amount !== product.amount) {
		return PaymeError.InvalidAmount;
	}

	return { allow: true };
};

const checkTransaction = async params => {
	const transaction = await Transaction.findOne({ id: params.id });
	if (!transaction) {
		return PaymeError.TransactionNotFound;
	}

	return {
		create_time: transaction.create_time,
		perform_time: transaction.perform_time,
		cancel_time: transaction.cancel_time,
		transaction: transaction.id,
		state: transaction.state,
		reason: transaction.reason,
	};
};

const createTransaction = async params => {
	const { account, time, amount } = params;

	const data = await checkPerformTransaction(params);
	if (data) {
		return data;
	}

	let transaction = await Transaction.findOne({ id: params.id });
	if (transaction) {
		if (transaction.state !== TransactionState.Pending) {
			return PaymeError.CantDoOperation;
		}

		const currentTime = Date.now();

		const expirationTime = (currentTime - transaction.create_time) / 60000 < 12; // 12m

		if (!expirationTime) {
			await Transaction.findByIdAndUpdate(
				{ _id: transaction._id },
				{
					$set: {
						state: TransactionState.PendingCanceled,
						reason: 4,
					},
				},
				{ new: true, useFindAndModify: false }
			);
			return PaymeError.CantDoOperation;
		}

		return {
			create_time: transaction.create_time,
			transaction: transaction.id,
			state: TransactionState.Pending,
		};
	}

	transaction = await Transaction.findOne({
		user_id: account.user_id,
		product_id: account.order_d,
	});

	if (transaction) {
		if (transaction.state === TransactionState.Paid)
			return PaymeError.AlreadyDone;
		if (transaction.state === TransactionState.Pending)
			return PaymeError.Pending;
	}

	const newTransaction = new Transaction({
		id: params.id,
		state: TransactionState.Pending,
		amount,
		user_id: account.user_id,
		product_id: account.order_id,
		create_time: time,
	});
	await newTransaction.save();
	return {
		transaction: newTransaction.id,
		state: TransactionState.Pending,
		create_time: newTransaction.create_time,
	};
};

const performTransaction = async params => {
	const currentTime = Date.now();

	const transaction = await Transaction.findOne({ id: params.id });
	if (!transaction) {
		return PaymeError.TransactionNotFound;
	}

	if (transaction.state !== TransactionState.Pending) {
		if (transaction.state !== TransactionState.Paid) {
			return PaymeError.CantDoOperation;
		}

		return {
			perform_time: transaction.perform_time,
			transaction: transaction.id,
			state: TransactionState.Paid,
		};
	}
	console.log((currentTime - transaction.create_time) / 60000);
	const expirationTime = (currentTime - transaction.create_time) / 60000 < 12; // 12m

	if (!expirationTime) {
		console.log('timed out transaction');
		await Transaction.findByIdAndUpdate(
			{ _id: transaction._id },
			{
				$set: {
					state: TransactionState.PendingCanceled,
					reason: 4,
					cancel_time: currentTime,
				},
			},
			{ new: true, useFindAndModify: false }
		);

		return PaymeError.CantDoOperation;
	}

	await Transaction.findByIdAndUpdate(
		{ _id: transaction._id },
		{
			$set: { state: TransactionState.Paid, perform_time: currentTime },
		},
		{ new: true, useFindAndModify: false }
	);

	return {
		perform_time: currentTime,
		transaction: transaction.id,
		state: TransactionState.Paid,
	};
};

const cancelTransaction = async params => {
	const transaction = await Transaction.findOne({ id: params.id });
	if (!transaction) {
		return PaymeError.TransactionNotFound;
	}

	const currentTime = Date.now();

	if (transaction.state === 1) {
		await Transaction.findByIdAndUpdate(
			{ _id: transaction._id },
			{
				$set: {
					state: -Math.abs(transaction.state),
					reason: params.reason,
					cancel_time: currentTime,
				},
			},
			{ new: true, useFindAndModify: false }
		);
	}

	if (transaction.state === 2) {
		return PaymeError.TransactionNotCancel;
	}

	return {
		cancel_time: transaction.cancel_time || currentTime,
		transaction: transaction.id,
		state: -Math.abs(transaction.state),
	};
};

export default {
	checkPerformTransaction,
	checkTransaction,
	createTransaction,
	performTransaction,
	cancelTransaction,
};
