import fs from "fs";
import path from "path";

export function GET(request: Request) {
	const correct = fs.readFileSync(path.join(process.cwd(), "public", "assets", "sounds", "Correct.wav"));	
	return new Response(
		correct,
		{
			headers: {
				"Content-Type": "audio/wav",
			},
		}
	);
}