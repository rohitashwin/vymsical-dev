import React, { ReactNode } from 'react';
import styles from './player.module.css';

type PlayerProps = {
	children: ReactNode;
};

const Player = ({ children, ...props }: PlayerProps) => {
	// Your component logic here
	return (
		<div className={styles['root-container']}>
			<div className={styles['player-container']}>
				{children}
			</div>
		</div>
	);
};

export default Player