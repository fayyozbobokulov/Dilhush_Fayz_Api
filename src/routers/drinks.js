import Router from 'express';
const router = Router();
import {
	getDrinks,
	getByIdDrink,
	postDrink,
	updateDrink,
	deletedDrink,
} from '../controllers/drinks.js';

router.post('/', postDrink);
router.put('/update/:id', updateDrink);
router.get('/', getDrinks);
router.get('/:id', getByIdDrink);
router.delete('/delete/:id', deletedDrink);

export default router;
