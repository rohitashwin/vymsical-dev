import fs from 'fs'
import path from 'path'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params
	// read the file from ./_songs/SONG_SLUG.mp3 and send it as a blob
	const file = fs.readFileSync(path.join(process.cwd(), '_songs', `SONG_${slug}.mp3`))
	return new Response(file, {
		headers: {
			'Content-Type': 'audio/mpeg',
			'Content-Disposition': `attachment; filename="SONG_${slug}.mp3"`,
		},
	})
}