import Image from 'next/image'
import Link from 'next/link'
import styles from './start.module.css'
import Player from '../components/player'

const StartPage = () => {
	return (
		<>
			<Player>
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
							<Link href='/game'>
								<div className={styles['play-button-container']}>
									<Image
										className={styles['play-image']}
										src='/assets/images/play.svg'
										alt='play'
										layout='fill'
									/>
								</div>
							</Link>
							<Link href='/leaderboard'>
								<div className={styles['leaderboard-button-container']}>
									<Image
										className={styles['leaderboard-image']}
										src='/assets/images/leaderboard.svg'
										alt='leaderboard'
										layout='fill'
									/>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</Player>
		</>
	)
}

export default StartPage
