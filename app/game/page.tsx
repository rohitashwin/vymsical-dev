'use client'
import { useState, useEffect } from 'react'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder.css'
import Player from '../components/player'
import styles from './game.module.css'

const LevelScreen = ({ level }: { level: string }) => {
	return (
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

const ROUNDS_PER_LEVEL = 10

const GamePage = () => {
	const [ready, setReady] = useState(false)
	const [currentLevel, setCurrentLevel] = useState('Easy')
	const [currentRound, setCurrentRound] = useState(1)
	const [currentScore, setCurrentScore] = useState(0)

	function startGame() {
		setTimeout(() => {
			setReady(true)
		}, 3000);
	}

	function advanceRound() {
		if (currentRound === ROUNDS_PER_LEVEL) {
			advanceLevel()
			setCurrentRound(1)
		} else {
			setCurrentRound(currentRound + 1)
		}
	}

	function advanceLevel() {
		if (currentLevel === 'Easy') {
			setCurrentLevel('Medium')
		} else if (currentLevel === 'Medium') {
			setCurrentLevel('Hard')
		} else {
			setCurrentLevel('Easy')
		}
	}

	function handleCorrectAnswer() {
		advanceRound()
	}

	useEffect(() => {
		setTimeout(() => {
			setReady(true);
		}, 4000)
	}, []);

	return (
		<>
			<Player>
				<ReactPlaceholder customPlaceholder={<LevelScreen level={currentLevel} />} ready={ready}>
					<></>
				</ReactPlaceholder>
			</Player>
		</>
	)
}

export default GamePage
