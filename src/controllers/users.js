import User from '../modules/users.js';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
	try {
		const currentUser = await User.findOne({
			email: req.body.email,
		});
		if (!currentUser) {
			const user = new User(req.body);
			const newuser = await user.save();
			res
				.status(200)
				.json({ message: 'User addet Sucsessfuly', data: newuser });
		} else {
			res.json({
				message: 'This email is olready exist',
			});
		}
	} catch (error) {
		res.status(401).json({ error: error.message });
		console.log(error);
	}
};

export const Login = async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});

		!user &&
			res.status(401).json({ data: false, message: 'Wrong email or password' });

		user.password !== req.body.password &&
			res.status(401).json('Wrong Password');

		const accessToken = jwt.sign(
			{
				id: user._id,
				password: user.password,
			},
			process.env.JWT_SEC,
			{ expiresIn: '3d' }
		);
		res.status(200).json({ accessToken });
	} catch (err) {
		res.status(500).json(err);
	}
};

// export const Logout = async (req, res) => {
// 	try {
// 		await User.updateOne(
// 			{ username: req.user.username },
// 			{
// 				$set: {
// 					acsesstoken: '',
// 				},
// 			}
// 		);
// 		res.status(200).json({ message: 'OK' });
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// };
