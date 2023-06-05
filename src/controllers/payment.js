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
// export const deletedDrink = async (req, res) => {
// 	try {
// 		await Drinks.findByIdAndDelete(req.params.id);
// 		res.status(200).json({ message: 'successfully deleted', data: true });
// 	} catch (error) {
// 		res.status(500).json({
// 			message: error.message,
// 			data: false,
// 		});
// 	}
// };

async function CheckTransaction( req, res ){
    try {
        const { method, params } = req.body;
        const { order_id } = params
        
        if (method !== 'CheckTransaction') throw new Error( '32504' );
		
        const findOrder = await Order.findOne({ orderNumber: order_id });

        if(!findOrder) throw new Error( '31003' )
        
        return res.json({ result: {
            create_time: 1111,
            perform_time: 1111,
            cancel_time: 0,
            transaction: order_id,
            state: 1,
            reason: null        
        }})
    } catch (error) {
        const message = error.message
        const result = {}
        
        if( message == 32504) result.error = "method not found"
        else if( message == 31003) result.error = "order not found"
        
        else result.error = "internal error"
        return  res.json( { error: error.message } )
    }
}


async function Handler( req, res){
    const { method } = req.body
    if(method === 'CheckTransaction') CheckTransaction(req, res)
    else if (method === 'CheckPerformTransaction') CheckTransaction(req, res);
		else if (method === 'CheckTransaction') CheckTransaction(req, res);
		else if (method === 'CheckTransaction') CheckTransaction(req, res);
		else if (method === 'CheckTransaction') CheckTransaction(req, res);
        else res.json( { error: "method not found"})
    
}