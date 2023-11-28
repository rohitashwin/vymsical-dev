const mongoose = require('mongoose');

const ATLAS_URI = process.env.ATLAS_URI;

const DATABASE_NAME = 'leaderboards_db';
const COLLECTION_NAME = 'leaderboards_collection';

const leaderboardSchema = new mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},
	Score: {
		type: Number,
		required: true,
	},
});

let db: any | null = null;

const connectDB = async () => {
	try {
		db = await mongoose.connect(ATLAS_URI, {
			dbName: DATABASE_NAME
		});
		console.log('MongoDB connected...');
	} catch (err: any) {
		console.error(err.message);
	}
}

const closeDB = async () => {
	try {
		await mongoose.connection.close();
		console.log('MongoDB disconnected...');
	} catch (err: any) {
		console.error(err.message);
		process.exit(1);
	}
}

const Leaderboard = mongoose.models[COLLECTION_NAME] || mongoose.model(COLLECTION_NAME, leaderboardSchema);

export async function GET(request: Request) {
	await connectDB();
	const leaderboards = await Leaderboard.find({}, { _id: 0, __v: 0 });
	await closeDB();
	return new Response(JSON.stringify(leaderboards), {
		headers: {
			'content-type': 'application/json',
		},
	});
}

export async function POST(request: Request) {
	const { Name, Score } = await request.json();
	await connectDB();
	const leaderboard = new Leaderboard({ Name, Score });
	await leaderboard.save();
	await closeDB();
	return new Response(JSON.stringify(leaderboard), {
		headers: {
			'content-type': 'application/json',
		},
	});
}