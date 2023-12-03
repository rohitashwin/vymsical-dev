'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './end.module.css'
import Player from '../components/player'

interface LeaderboardItem {
	Name: string
	Score: number
}

const EndPage = () => {
	useEffect(() => {
		// read the name and score from local storage
		const name = window.localStorage.getItem('name')
		const score = window.localStorage.getItem('score')
		const leaderboardItem = { Name: name, Score: score }
		// send the name and score to the server
		fetch(`/api/leaderboards`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(leaderboardItem),
		}).then((response) => {
			console.log(response)
		})
	}, [])
	return (
		<Player>
			<div className={styles['buttons-container']}>
				<Link className={styles['leaderboards-link']} href='/leaderboards'>Leaderboards</Link>
				<Link className={styles['start-link']} href='https://vymsical-ld7swxof7-rohitashwin.vercel.app/' replace={true}>Restart</Link>
			</div>
		</Player>
	)
}

export default EndPage
