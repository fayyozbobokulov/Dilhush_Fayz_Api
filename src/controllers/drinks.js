import Drinks from '../modules/drinks.js';

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
		const drink = await Drinks.findById(req.params.id);
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

// Post Method
export const postDrink = async (req, res) => {
	try {
		const drink = new Drinks({ img: req.file.filename, ...req.body });
		await drink.save();
		res.status(200).json({ message: 'successfully updatedAt', data: drink });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Put Method
export const updateDrink = async (req, res) => {
	try {
		const newDrink = await Drinks.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					img: req.file.filename,
					...req.body,
				},
			},
			{ new: true, useFindAndModify: false }
		);
		!newDrink &&
			res.status(500).json({
				message: 'Is not a group',
				data: false,
			});
		res.status(200).json({ message: 'Successfully updated', data: newDrink });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

// Delete Method
export const deletedDrink = async (req, res) => {
	try {
		await Drinks.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};

export const filterDrink = async (req, res) => {
	try {
		const data = await Drinks.find();
		res.status(200).json({ message: 'successfully deleted', data: true });
	} catch (error) {
		res.status(500).json({
			message: error.message,
			data: false,
		});
	}
};
