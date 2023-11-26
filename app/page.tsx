'use client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const randIndex = Math.floor(Math.random() * 51);
		console.log(randIndex);
		fetch(`/api/songs/${randIndex}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'audio/mpeg',
			}
		}).then((response) => {
			return response.blob();
		}).then((blob) => {
			const url = URL.createObjectURL(blob);
			console.log(url);
			const audio = new Audio(url);
			audio.play();
		});
	}
  return <>
		<button onClick={handleClick}>Click Here!</button>
  </>
}
