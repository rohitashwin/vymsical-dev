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

interface Timer {
	start: number
	end: number
}

const GamePage = () => {
	const [allGames, setAllGames] = useState<Game[]>([])
	const [filteredGames, setFilteredGames] = useState<Game[]>([])
	const [currentGame, setCurrentGame] = useState<Game | null>(null)
	const [currentRound, setCurrentRound] = useState(0)
	const [currentScore, setCurrentScore] = useState(0)
	const [currentLevel, setCurrentLevel] = useState(GameDifficulty.Easy)
	const [timer, setTimer] = useState<Timer | null>(null)

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
		
	}

	return <>

	</>
}

export default GamePage
