import service from '../services/transaction.service.js';

export const payme = async (req, res, next) => {
	try {
		const { method, params } = req.body;

		switch (method) {
			case 'CheckPerformTransaction': {
				const data = await service.checkPerformTransaction(params);
				if (!data) {
					return res.json({ result: { allow: true } });
				}
				return res.json(data);
			}
			case 'CheckTransaction': {
				const result = await service.checkTransaction(params);

				return res.json({ result: result });
			}
			case 'CreateTransaction': {
				const result = await service.createTransaction(params);

				return res.json({ result: result });
			}
			case 'PerformTransaction': {
				const result = await service.performTransaction(params);

				return res.json({ result: result });
			}
			case 'CancelTransaction': {
				const result = await service.cancelTransaction(params);

				return res.json({ result: result });
			}
		}
	} catch (err) {
		next(err);
	}
};
