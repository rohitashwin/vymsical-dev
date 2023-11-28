'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const randIndex = Math.floor(Math.random() * 51);
		console.log(randIndex);
		fetch(`/api/leaderboards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			console.log(data);
		});
	}
  return <>
		<button onClick={handleClick}>Click Here!</button>
  </>
}
