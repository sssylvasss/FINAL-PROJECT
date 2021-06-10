import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/spaceAPI';
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
mongoose.Promise = Promise;

const Citizen = mongoose.model('Citizen', {
	username: {
		type: String,
		required: [true, 'Username Required'],
		unique: [true, 'Username is already taken'],
	},
	email: {
		type: String,
		required: [true, 'Email required'],
		unique: [true, 'This email is already registrated'],
		trim: true,
		validate: {
			validator: (value) => {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
			},
			message: 'Please, enter a valid email',
		},
	},
	password: {
		type: String,
		required: [true, 'Password required'],
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
	badges: {
		type: Number,
		default: 5,
	},
	ranking: {
		type: Number,
		default: 10,
	},
	coins: {
		type: Number,
		default: 10,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const CitizenMessage = mongoose.model('CitizenMessage', {
	message: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
})

// Authorization
const authenticateCitizen = async (req, res, next) => {
	const accessToken = req.header('Authorization');

	try {
		const citizen = await Citizen.findOne({ accessToken });
		if (citizen) {
			next();
		} else {
			res.status(401).json({ success: false, message: 'Not authorized' });
		}
	} catch (error) {
		res.status(400).json({ success: false, message: 'Invalid request', error });
	}
};

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello world');
});

// GET for logged in citizen
// app.get('/citizen', authenticateCitizen);
// app.get('/citizen', async (req, res) => {
// 	const profile = await Citizen.findById({ username, createdAt, badges });

// 	try {
// 		res.json(profile);
// 	} catch (error) {
// 		res.status(400).json({ message: 'Invalid request, profil not fund', error });
// 	}
// });

// GET all citizens
// app.get('/citizens', authenticateCitizen);
app.get('/citizens', async (req, res) => {
	const { sort } = req.query;
	const sortCitizens = (sort) => {
		if (sort === 'mostBadges') {
			return { badges: -1 };
		} else if (sort === 'senior') {
			return { createdAt: 1 };
		} else if (sort === 'junior') {
			return { createdAt: -1 }
		} else if (sort === 'richest') {
			return { coins: -1 }
		} else {
			return { ranking: -1 };
		}
	};

	const allCitizens = await Citizen.find().sort(sortCitizens(sort));

	try {
		return res.json({ allCitizens });
	} catch (error) {
		res.status(400).json({ message: 'Someting went wrong', error });
	}
});

// POST for signing up
app.post('/signup', async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const salt = bcrypt.genSaltSync();

		const newCitizen = await new Citizen({
			username,
			email,
			password: bcrypt.hashSync(password, salt),
		}).save();
		res.json({
			success: true,
			username: newCitizen.username,
			email: newCitizen.email,
			userId: newCitizen._id,
			accessToken: newCitizen.accessToken,
			badges: newCitizen.badges,
			ranking: newCitizen.ranking,
			coins: newCitizen.coins,
			createdAt: newCitizen.createdAt,
		});
	} catch (error) {
		if (error.code === 11000) {
			if (error.keyValue.username) {
			res.status(400).json({
			success: false,
			message: "Username already taken, sorry! :)",
			error,
			});
				} else if (error.keyValue.email) {
				res.status(400).json({
				success: false,
				message: "Email already taken, sorry! :)",
				error,
				});
				}
		}
		res.status(400).json({ success: false, message: "Invalid request", error });
	}
});

// POST for signing in
app.post('/signin', async (req, res) => {
	const { username, password } = req.body;

	try {
		const citizen = await Citizen.findOne({ username });

		if (citizen && bcrypt.compareSync(password, citizen.password)) {
			res.json({
				success: true,
				userId: citizen._id,
				username: citizen.username,
				accessToken: citizen.accessToken,
				badges: citizen.badges,
				ranking: citizen.ranking,
				coins: citizen.coins,
				createdAt: citizen.createdAt,
			});
		} else {
			res.status(404).json({ success: false, message: 'Citizen not found' });
		}
	} catch (error) {
		res
			.status(400)
			.json({ success: false, message: 'Blä!!Invalid request', error });
	}
});

// GET Messages for messageboard
// app.get('/citizenmessage', authenticateCitizen);
app.get('/citizenmessage', async (req, res) => {
	const citizenMessage = await CitizenMessage.find().sort({ createdAt: -1 });
	res.json({ success: true, citizenMessage })
});

// POST message on messageboard
// app.post('/citizenmessage', authenticateCitizen);
app.post('/citizenmessage', async (req, res) => {
	const { message } = req.body;

	try {
		const newCitizenMessage = await new CitizenMessage({ message }).save();
		res.json({ success: true, newCitizenMessage });
	} catch (error) {
		res.status(400).json({ success: false, message: 'Invalid request', error })
	}
});

// PATCH for increasing badges
// app.put('/citizen/:id/badges', authenticateCitizen);
app.patch('/citizen/:id/badges', async (req, res) => {
	const { id } = req.params;
	try {
		const updatedBadges = await Citizen.findByIdAndUpdate(
			id,
			{ 
				$inc: { 
					badges: req.body.badges 
				}
			},
			{ new: true }
		);
		if (updatedBadges) {
			res.json(updatedBadges);
		} else {
			res.status(404).json({ message: 'Not found!' });
		}
	} catch (error) {
		res.status(400).json({ message: 'Invalid request', error });
	}
});

// PATCH for increasing ranking
// app.put('/citizen/:id/ranking', authenticateCitizen);
app.patch('/citizen/:id/ranking', async (req, res) => {
	const { id } = req.params;
	try {
		const updatedRanking = await Citizen.findByIdAndUpdate(
			id,
			{ 
				$inc: { 
					ranking: req.body.ranking
				}
			},
			{ new: true }
		);
		if (updatedRanking) {
			res.json(updatedRanking);
		} else {
			res.status(404).json({ message: 'Not found!' });
		}
	} catch (error) {
		res.status(400).json({ message: 'Invalid request', error });
	}
});

// PATCH for increasing coins
// app.put('/citizen/:id/coins', authenticateCitizen);
app.patch('/citizen/:id/coins', async (req, res) => {
	const { id } = req.params;
	try {
		const updatedCoins = await Citizen.findByIdAndUpdate(
			id,
			{ 
				$inc: { 
					coins: req.body.coins
				}
			},
			{ new: true }
		);
		if (updatedCoins) {
			res.json(updatedCoins);
		} else {
			res.status(404).json({ message: 'Not found!' });
		}
	} catch (error) {
		res.status(400).json({ message: 'Invalid request', error });
	}
});


app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
