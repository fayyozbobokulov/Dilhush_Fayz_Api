import Router from 'express';
const router = Router();
import {
	getPizza,
	getByIdPizza,
	postPizza,
	updatePizza,
	deletedPizza,
} from '../controllers/pizzas.js';

router.post('/', postPizza);
router.put('/update/:id', updatePizza);
router.get('/', getPizza);
router.get('/:id', getByIdPizza);
router.delete('/delete/:id', deletedPizza);

export default router;
