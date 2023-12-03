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
			<div className={styles['go-container']}>
				<button className={styles['go-button']} onClick={clickHandler}>
					Press Here
				</button>
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
								<button onClick={(event) => {playSoundAndRedirect(event, '/game')}}>
									<div className={styles['play-button-container']}>
										<Image
											className={styles['play-image']}
											src='/assets/images/play.svg'
											alt='play'
											layout='fill'
										/>
									</div>
								</button>
								<button onClick={(event) => {playSoundAndRedirect(event, '/leaderboards')}}>
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
