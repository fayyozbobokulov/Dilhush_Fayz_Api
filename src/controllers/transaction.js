import service from '../services/transaction.service.js';

export const payme = async (req, res, next) => {
	try {
		const { method, params } = req.body;

		switch (method) {
			case 'CheckPerformTransaction': {
				await service.checkPerformTransaction(params);

				return res.json({ result: { allow: true } });
			}
			case 'CheckTransaction': {
				const result = await this.service.checkTransaction(params);

				return res.json({ result: result });
			}
			case 'CreateTransaction': {
				const result = await this.service.createTransaction(params);

				return res.json({ result: result });
			}
			case 'PerformTransaction': {
				const result = await this.service.performTransaction(params);

				return res.json({ result: result });
			}
			case 'CancelTransaction': {
				const result = await this.service.cancelTransaction(params);

				return res.json({ result: result });
			}
		}
	} catch (err) {
		next(err);
	}
};
