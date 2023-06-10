import service from '../services/transaction.service.js';

export const payme = async (req, res, next) => {
	try {
		const { method, params, id, jsonrpc } = req.body;

		switch (method) {
			case 'CheckPerformTransaction': {
				const data = await service.checkPerformTransaction(params);
				return res.json({ result: data, id, jsonrpc, method });
			}
			case 'CheckTransaction': {
				const result = await service.checkTransaction(params);

				return res.json({ result: result, id, jsonrpc, method });
			}
			case 'CreateTransaction': {
				const result = await service.createTransaction(params);

				return res.json({ result: result, id, jsonrpc, method });
			}
			case 'PerformTransaction': {
				const result = await service.performTransaction(params);

				return res.json({ result: result, id, jsonrpc, method });
			}
			case 'CancelTransaction': {
				const result = await service.cancelTransaction(params);

				return res.json({ result: result, id, jsonrpc, method });
			}
		}
	} catch (err) {
		next(err);
	}
};
