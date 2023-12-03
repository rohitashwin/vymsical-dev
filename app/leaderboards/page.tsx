'use client'
import { useState, useEffect } from 'react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
import Player from '../components/player';
import styles from './leaderboards.module.css';

const LoadingLeaderboards = () => {
	return <>
		<div className={styles['loader-container']}>
			<h1 className={styles['loader-text']}>Loading...</h1>
		</div>
	</>
}

interface LeaderboardItem {
	Name: string,
	Score: number
}

const Leaderboards = ({ leaderboards }: { leaderboards: LeaderboardItem[] }) => {
	return <>
		<div className={styles['leaderboards-container']}>
			<h1 className={styles['leaderboards-header']}>Leaderboards</h1>
			<div className={styles['leaderboards-table-container']}>
				<table className={styles['leaderboards-table']}>
					<thead>
						<tr className={styles['leaderboards-table-row']}>
							<th className={styles['leaderboards-table-header']}>Name</th>
							<th className={styles['leaderboards-table-header']}>Score</th>
						</tr>
					</thead>
					<tbody className={styles['leaderboards-table-body']}>
						{/* {leaderboards.map((item, index) => {
							return (
								<tr key={index}>
									<td className={styles['leaderboards-table-data']}>{item.Name}</td>
									<td className={styles['leaderboards-table-data']}>{item.Score}</td>
								</tr>
							)
						})} */}
						{/* sort by score and then show the unique table rows */}
						{leaderboards.sort((a, b) => {
							return b.Score - a.Score;
						}).map((item, index) => {
							return (
								<tr key={index} className={styles['leaderboards-table-row']}>
									<td className={styles['leaderboards-table-data']}>{item.Name}</td>
									<td className={styles['leaderboards-table-data']}>{item.Score}</td>
								</tr>
							)
						}).filter((item, index, self) => {
							return index === self.findIndex((t) => (
								t.props.children[0].props.children === item.props.children[0].props.children
							))
						})}
					</tbody>
				</table>
			</div>
		</div>
	</>
}

export default function LeaderboardsPage() {
	const [ready, setReady] = useState<boolean>(false);
	const [leaderboards, setLeaderboards] = useState<LeaderboardItem[]>([]);

	useEffect(() => {
		fetch(`/api/leaderboards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			setLeaderboards(data);
			setReady(true);
		});
	}, []);

	return <>
		<Player>
			<ReactPlaceholder customPlaceholder={<LoadingLeaderboards />} ready={ready}>
				<Leaderboards leaderboards={leaderboards} />
			</ReactPlaceholder>
		</Player>
	</>
}