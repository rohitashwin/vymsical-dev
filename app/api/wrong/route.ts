import fs from "fs";
import path from "path";

export function GET(request: Request) {
	const wrong = fs.readFileSync(path.join(process.cwd(), "public", "assets", "sounds", "Wrong.wav"));
	return new Response(
		wrong,
		{
			headers: {
				"Content-Type": "audio/wav",
			},
		}
	);
}