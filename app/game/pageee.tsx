'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import styles from './game.module.css'

const API_URL = '/api/songs'
const ROUNDS_PER_LEVEL = 10

interface Game {
	Name: string
	Artist: string
	Difficulty: string
}

enum GameDifficulty {
	Easy,
	Medium,
	Hard,
}

const GamePage = () => {
	const [allGames, setAllGames] = useState<Game[]>([])
	const [filteredGames, setFilteredGames] = useState<Game[]>([])
	const [currentGame, setCurrentGame] = useState<Game | null>(null)
	const [currentRound, setCurrentRound] = useState(0)
	const [currentScore, setCurrentScore] = useState(0)
	const [currentLevel, setCurrentLevel] = useState(GameDifficulty.Easy)
	const [time, setTime] = useState(0)

	useEffect(() => {
		fetch(API_URL)
			.then((response) => response.json())
			.then((data) => {
				setAllGames(data)
				setFilteredGames(data)
			})
	}, [])

	function initialiseGame() {
		setCurrentRound(0)
		setCurrentScore(0)
		setCurrentLevel(GameDifficulty.Easy)
	}

	function advanceLevel() {
		if (currentLevel === GameDifficulty.Easy) {
			setCurrentLevel(GameDifficulty.Medium)
		} else if (currentLevel === GameDifficulty.Medium) {
			setCurrentLevel(GameDifficulty.Hard)
		}
	}

	function advanceRound() {
		if (currentRound >= ROUNDS_PER_LEVEL - 1) {
			advanceLevel()
			setCurrentRound(0)
		}
		setCurrentRound(currentRound + 1)
	}

	function handleCorrectAnswer() {
		const delta = Date.now() - time
		// if guessed within 5 seconds give 2x points
		// if guessed within 10 seconds give 1.5x points
		const multiplier = delta < 5000 ? 2 : delta < 10000 ? 1.5 : 1
		// base score = 10 for easy, 20 for medium, 30 for hard
		const baseScore = 10 + 10 * currentLevel
		const score = Math.round(baseScore * multiplier)
	}

	return <></>
}

export default GamePage
