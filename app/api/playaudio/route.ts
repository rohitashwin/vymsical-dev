import fs from "fs";
import path from "path";

export function GET(request: Request) {
	const playbutton = fs.readFileSync(path.join(process.cwd(), "public", "assets", "sounds", "PlayButton.wav"));
	return new Response(
		playbutton,
		{
			headers: {
				"Content-Type": "audio/wav",
			},
		}
	);
}