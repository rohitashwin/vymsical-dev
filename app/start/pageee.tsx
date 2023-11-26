import Image from 'next/image'
import Link from 'next/link'
import styles from './start.module.css'

const StartPage = () => {
	return (
		<div className={styles.root}>
			<div className={styles['root-container']}>
				<Image src='/assets/images/banner.jpeg' alt='Banner' width={400} height={400} />
				<div className={styles['start-container']}>
					<div className={styles['start-header']}>
						<h1 style={{ fontWeight: 'bold' }}>vymsical</h1>
						<p>Press start to play</p>
					</div>
					<div className={styles['start-controls']}>
						<Link href='/game' className={styles['play-button']}>
							<Image src='/assets/images/play.svg' width={25} height={25} alt='play' />
						</Link>
						<Link href='/leaderboards' className={styles['leaderboard-button']}>
							<Image
								src='/assets/images/leaderboard.svg'
								width={27}
								height={27}
								alt='leaderboards'
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StartPage
