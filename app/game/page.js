import React from 'react'
import styles from './game.module.css'

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<img src='/imgs/card-img.png' className={styles.cardImg} />
				<div className={styles.bottom}>
					<div className={styles.heading}>
						<span>vymsical</span>tap play to start
					</div>

					<div className={styles.controls}>
						<div className={styles.play}>
							<img src='/svgs/play.svg' />
						</div>
						<div className={styles.leaderboards}>
							<img src='/svgs/leaderboards.svg' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
