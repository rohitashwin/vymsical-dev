import React from 'react'
import styles from './start.module.css'

export default function Start() {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.top}>
					<div className={styles.level}>Level: Easy</div>
					<div className={styles.round}>Round: 3/12</div>
				</div>
				<img src='/imgs/card-img.png' className={styles.cardImg} />
				<div className={styles.bottom}>
					<div className={styles.buttonWrapper}>
						<SongButton title='Time' artist='Pink Floyd' />
						<SongButton title='Time' artist='Pink Floyd' />
						<SongButton title='Time' artist='Pink Floyd' />
						<SongButton title='Time' artist='Pink Floyd' />
						<div className={styles.play}>
							<img src='/svgs/play.svg' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function SongButton({ title, artist }) {
	return (
		<div className={styles.songButtonContainer}>
			<span>{title}</span>
			{artist}
		</div>
	)
}
