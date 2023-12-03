'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const randIndex = Math.floor(Math.random() * 51);
		console.log(randIndex);
		fetch(`/api/songs`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			return response.json();
		}).then((data) => {
			const newObject: any = [];
			data.forEach((song: any, index: number) => {
				newObject.push({
					...song,
					Index: index
				});
			});
			console.log(JSON.stringify(newObject));
		});
	}
  return <>
		<button onClick={handleClick}>Click Here!</button>
  </>
}
