'use client'
import { useState, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import styles from './start.module.css'
import Player from '../components/player'
import ReactPlaceholder from 'react-placeholder'

const LoadingPlaceholder = ({ clickHandler }: { clickHandler: any }) => {
	return (
		<>
			{/* create a form with a label, a name field, and a submit button; and the click handler should be called on submit */}
			{/* pass the event and the name to the click handler */}
			<div className={styles['go-container']}>
				<form action="post" className={styles['name-form']} onSubmit={clickHandler}>
					<label className={styles['name-form-label']} htmlFor="name">Enter Name:</label>
					<input className={styles['name-form-field']} type="text" name="name" id="name" />
					<button className={styles['name-form-button']} type='submit'>Start!</button>
				</form>
			</div>
		</>
	)
}

const StartPage = () => {
	const [ready, setReady] = useState(false)
	const [bgsound, setBgsound] = useState<HTMLAudioElement | null>(null)
	const [playbutton, setPlaybutton] = useState<HTMLAudioElement | null>(null)
	const router = useRouter()

	function introClickHandler(event: any) {
		event.preventDefault()
		window.localStorage.setItem('name', event.target.name.value)
		console.log('name: ', event.target.name.value);
		setReady(true)
		// simultaneously fetch songs from /api/start and /api/playaudio endpoints
		const fetchBG = fetch(`/api/bg`, {
			method: 'GET',
			headers: {
				'Content-Type': 'audio/mpeg'
			}
		})
		const fetchPBAudio = fetch(`/api/playaudio`, {
			method: 'GET',
			headers: {
				'Content-Type': 'audio/wav'
			}
		})
		fetchBG.then((response) => {
			return response.blob()
		}).then((data) => {
			const audio = new Audio(URL.createObjectURL(data))
			setBgsound(audio)
			audio.loop = true
			audio.play()
		});
		fetchPBAudio.then((response) => {
			return response.blob()
		}).then((data) => {
			const audio = new Audio(URL.createObjectURL(data))
			setPlaybutton(audio)
		});
	}

	function playSoundAndRedirect(event: any, url: string) {
		event.preventDefault()
		bgsound?.pause()
		playbutton?.play()
		setTimeout(() => {
			router.push(url)
		}, 1000)
	}

	return (
		<>
			<Player>
				<ReactPlaceholder
					ready={ready}
					customPlaceholder={<LoadingPlaceholder clickHandler={introClickHandler} />}
				>
					<div className={styles['start-container']}>
						<div className={styles['banner-container']}>
							<Image
								className={styles['banner-image']}
								src='/assets/images/banner.jpeg'
								alt='banner'
								layout='fill'
							/>
						</div>
						<div className={styles['hero-container']}>
							<div className={styles['header-container']}>
								<h1 className={styles['header-title']}>vymsical</h1>
								<h4 className={styles['header-subtitle']}>press play to start</h4>
							</div>
							<div className={styles['controls-container']}>
								<button className={styles['link-button']} onClick={(event) => {playSoundAndRedirect(event, '/game')}}>
									<div className={styles['play-button-container']}>
										<Image
											className={styles['play-image']}
											src='/assets/images/play.svg'
											alt='play'
											layout='fill'
										/>
									</div>
								</button>
								<button className={styles['link-button']} onClick={(event) => {playSoundAndRedirect(event, '/leaderboards')}}>
									<div className={styles['leaderboard-button-container']}>
										<Image
											className={styles['leaderboard-image']}
											src='/assets/images/leaderboard.svg'
											alt='leaderboard'
											layout='fill'
										/>
									</div>
								</button>
							</div>
						</div>
					</div>
				</ReactPlaceholder>
			</Player>
		</>
	)
}

export default StartPage
