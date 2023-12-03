'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import Player from '../components/player'
import styles from './game.module.css'

const LevelScreen = ({ level }: { level: string }) => {
	return (
		level === 'END' ? <></> :
		<>
			<div className={styles['level-screen-container']}>
				<h1 className={styles['level-header-text']}>LEVEL:</h1>
				<h1 className={styles['level-number-text']} data-level={level}>
					{level}
				</h1>
			</div>
		</>
	)
}

interface Song {
	Name: string,
	Artist: string,
	Difficulty: string,
	Index: number
}

const ROUNDS_PER_LEVEL = 10
const END_LOCATION = '/end'

const GamePage = () => {
	const [ready, setReady] = useState(false)
	const [allSongs, setAllSongs] = useState<Song[]>([])
	const [currentSong, setCurrentSong] = useState<Song | null>(null)
	const [currentSongs, setCurrentSongs] = useState<Song[]>([])
	const [easySongsSubset, setEasySongsSubset] = useState<Song[]>([])
	const [mediumSongsSubset, setMediumSongsSubset] = useState<Song[]>([])
	const [hardSongsSubset, setHardSongsSubset] = useState<Song[]>([])
	const [currentLevel, setCurrentLevel] = useState('Easy')
	const [currentRound, setCurrentRound] = useState(1)
	const [currentScore, setCurrentScore] = useState(0)
	const [startTime, setStartTime] = useState(0)
	const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
	const [playButtonElement, setPlayButtonElement] = useState<HTMLButtonElement | null>(null)
	const [bgAudioElement, setBgAudioElement] = useState<HTMLAudioElement | null>(null)
	const [correctAudioElement, setCorrectAudioElement] = useState<HTMLAudioElement | null>(null)
	const [wrongAudioElement, setWrongAudioElement] = useState<HTMLAudioElement | null>(null)
	const router = useRouter();

	function prefetchAudios() {
		const fetchBG = fetch(`/api/bg`, {
			method: 'GET',
			headers: {
				'Content-Type': 'audio/mpeg'
			}
		})
		const fetchCorrectAudio = fetch(`/api/correct`, {
			method: 'GET',
			headers: {
				'Content-Type': 'audio/wav'
			}
		})
		const fetchWrongAudio = fetch(`/api/wrong`, {
			method: 'GET',
			headers: {
				'Content-Type': 'audio/wav'
			}
		})
		fetchBG.then((response) => {
			return response.blob()
		}).then((data) => {
			const audio = new Audio(URL.createObjectURL(data))
			setBgAudioElement(audio)
			audio.loop = true
			audio.play()
		});
		fetchCorrectAudio.then((response) => {
			return response.blob()
		}).then((data) => {
			const audio = new Audio(URL.createObjectURL(data))
			setCorrectAudioElement(audio)
		});
		fetchWrongAudio.then((response) => {
			return response.blob()
		}).then((data) => {
			const audio = new Audio(URL.createObjectURL(data))
			setWrongAudioElement(audio)
		});
	}

	function initialiseGame() {
		prefetchAudios();
		fetch(`/api/songs`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json()
		}).then((data) => {
			const songs: Song[] = data;
			setAllSongs(songs)
			let easySongs: Song[] = [];
			let mediumSongs: Song[] = [];
			let hardSongs: Song[] = [];
			songs.forEach((song) => {
				if (song.Difficulty === 'Easy') {
					easySongs.push(song);
				} else if (song.Difficulty === 'Medium') {
					mediumSongs.push(song);
				} else {
					hardSongs.push(song);
				}
			});
			// shuffle each array
			easySongs.sort(() => Math.random() - 0.5);
			mediumSongs.sort(() => Math.random() - 0.5);
			hardSongs.sort(() => Math.random() - 0.5);
			// take the first ROUNDS_PER_LEVEL songs from each array
			setEasySongsSubset(easySongs.slice(0, ROUNDS_PER_LEVEL))
			setMediumSongsSubset(mediumSongs.slice(0, ROUNDS_PER_LEVEL))
			setHardSongsSubset(hardSongs.slice(0, ROUNDS_PER_LEVEL))
			startGame()

			// SETUP GAME
			const randIndex = Math.floor(Math.random() * ROUNDS_PER_LEVEL);
			let correctSong: Song | null = null;
			if (currentLevel === 'Easy') {
				correctSong = easySongs[randIndex];
			} else if (currentLevel === 'Medium') {
				correctSong = mediumSongs[randIndex];
			}	else {
				correctSong = hardSongs[randIndex];
			}
			// generate 3 random indices
			const randomIndices: number[] = [correctSong.Index];
			while (randomIndices.length < 4) {
				const randIndex = Math.floor(Math.random() * songs.length);
				if (!randomIndices.includes(randIndex)) {
					randomIndices.push(randIndex);
				}
			}
			// shuffle the indices
			randomIndices.sort(() => Math.random() - 0.5);
			// set the current song
			// set the current songs
			const currentSongs: Song[] = [];
			randomIndices.forEach((index) => {
				currentSongs.push(songs[index]);
			});
			setCurrentSong(correctSong);
			setCurrentSongs(currentSongs);
		})
	}

	function resetGame() {
			const randIndex = Math.floor(Math.random() * ROUNDS_PER_LEVEL);
			let correctSong: Song | null = null;
			if (currentLevel === 'Easy') {
				correctSong =	easySongsSubset[randIndex];
			} else if (currentLevel === 'Medium') {
				correctSong = mediumSongsSubset[randIndex];
			}	else {
				correctSong = hardSongsSubset[randIndex];
			}

			const randomIndices: number[] = [correctSong.Index];
			while (randomIndices.length < 4) {
				const randIndex = Math.floor(Math.random() * allSongs.length);
				if (!randomIndices.includes(randIndex)) {
					randomIndices.push(randIndex);
				}
			}

			randomIndices.sort(() => Math.random() - 0.5);
			const currentSongs: Song[] = [];
			randomIndices.forEach((index) => {
				currentSongs.push(allSongs[index]);
			});
			setCurrentSong(correctSong);
			setCurrentSongs(currentSongs);
	}

	function endGame() {
		window.localStorage.setItem('score', currentScore.toString())
		router.push(END_LOCATION);
	}

	function startGame() {
		setCurrentLevel('Easy')
		setCurrentRound(1)
		setCurrentScore(0)
		setTimeout(() => {
			setReady(true)
		}, 3000);
	}

	function handleAnswerClick(event: React.MouseEvent<HTMLButtonElement>, song: Song) {
		audioElement?.pause();
		playButtonElement?.removeAttribute('disabled');
		event.preventDefault();
		if (song.Index === currentSong?.Index) {
			handleCorrectAnswer();
		} else {
			advanceRound();
		}
	}

	function handlePlayButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setPlayButtonElement(event.currentTarget);
		audioElement?.pause();
		setStartTime(Date.now());
		event.currentTarget.disabled = true;
		fetch(`/api/songs/${currentSong?.Index}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'audio/mpeg'
			}
		}).then((response) => {
			return response.blob();
		}).then((data) => {
			const audio = new Audio(URL.createObjectURL(data));
			audio.play();
			setAudioElement(audio);
		});
	}

	function advanceRound() {
		if (currentRound >= ROUNDS_PER_LEVEL) {
			advanceLevel()
			setCurrentRound(1)
		} else {
			setCurrentRound(currentRound + 1)
		}
		resetGame()
	}

	function advanceLevel() {
		if (currentLevel === 'Easy') {
			setCurrentLevel('Medium')
		} else if (currentLevel === 'Medium') {
			setCurrentLevel('Hard')
		} else {
			setCurrentLevel('END')
			endGame()
		}
		playAnimation();
	}

	function handleCorrectAnswer() {
		const endTime = Date.now()
		const timeElapsed = endTime - startTime
		// guessed within 10 seconds -> 100 points
		// guessed within 20 seconds -> 50 points
		// guessed > 30 seconds -> 25 points
		let points = 0
		if (timeElapsed <= 10000) {
			points = 100
		} else if (timeElapsed <= 20000) {
			points = 50
		} else {
			points = 25
		}
		setCurrentScore(currentScore + points)
		advanceRound()
	}

	useEffect(() => {
		setTimeout(() => {
			setReady(true);
		}, 4000)
		initialiseGame();
	}, []);

	function playAnimation() {
		setReady(false);
		setTimeout(() => {
			setReady(true);
		}
		, 4000);
	}

	return (
		<>
			<Player>
				<ReactPlaceholder customPlaceholder={<LevelScreen level={currentLevel} />} ready={ready}>
					<div>
						<button>Round: {currentRound}</button>
						<button>Score: {currentScore}</button>
						<button id='play-button' onClick={handlePlayButtonClick}>
							Play
						</button>
						{
							currentSongs.map((song, index) => {
								return (
									<button key={index} onClick={(event) => handleAnswerClick(event, song)}>
										{song.Name} - {song.Artist}
									</button>
								)
							})
						}
					</div>
				</ReactPlaceholder>
			</Player>
		</>
	)
}

export default GamePage
