import { useState, useEffect } from 'react'
import './Header.scss'
import logoSvg from './logo.svg'

export default function Header() {
	const initialTimerState = {
		days: 27,
		hours: 21,
		minutes: 0,
		seconds: 0,
	}

	const [timer, setTimer] = useState(
		JSON.parse(localStorage.getItem('timer')) || initialTimerState,
	)

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer(prevTimer => {
				const updatedTimer = { ...prevTimer }
				if (updatedTimer.seconds > 0) {
					updatedTimer.seconds--
				} else {
					if (updatedTimer.minutes > 0) {
						updatedTimer.minutes--
						updatedTimer.seconds = 59
					} else {
						if (updatedTimer.hours > 0) {
							updatedTimer.hours--
							updatedTimer.minutes = 59
							updatedTimer.seconds = 59
						} else {
							if (updatedTimer.days > 0) {
								updatedTimer.days--
								updatedTimer.hours = 23
								updatedTimer.minutes = 59
								updatedTimer.seconds = 59
							}
						}
					}
				}
				return updatedTimer
			})
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('timer', JSON.stringify(timer))
	}, [timer])

	return (
		<div className='header'>
			<div className='container'>
				<a href='#'>
					<div className='header__logo'>
						<img width='50' src={logoSvg} alt='game logo' />
						<div>
							<h1>Dedan</h1>
							<p>Всё ради вашего времени</p>
						</div>
					</div>
				</a>
				<div className='header__desc'>
					Innovation <br />
					<span>
						до релиза - {timer.days} дней, {timer.hours} часов, {timer.minutes}{' '}
						минут, {timer.seconds} секунд
					</span>
				</div>
			</div>
		</div>
	)
}
