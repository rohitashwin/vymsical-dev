import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export function GET(request: NextRequest) {
	// load the sound file from {PROJECTROOT}/public/assets/sounds/Arcade Music.mp3
	const bgsound = fs.readFileSync(path.join(process.cwd(), "public", "assets", "sounds", "ArcadeMusic.mp3"));
	// return a response containing both sounds as a blob
	return new Response(
		bgsound,
		{
			headers: {
				"Content-Type": "audio/mpeg",
			},
		}
	);
}