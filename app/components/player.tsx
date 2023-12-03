import React, { ReactNode } from 'react'
import styles from './player.module.css'

type PlayerProps = {
	buttonHandler?: (event: any) => void
	buttonContents?: ReactNode
	children: ReactNode
}

const Player = ({ children, buttonHandler, buttonContents, ...props }: PlayerProps) => {
	// Your component logic here
	return (
		<div className={styles['root-container']}>
			<div className={styles['player-container']}>{children}</div>
			<div className={styles['button-container']}>
				{ buttonHandler && <button className={styles['custom-button']} onClick={buttonHandler}>{buttonContents}</button> }
			</div>
		</div>
	)
}

export default Player