import { useRef } from 'react'

import { Button, Container, Text, Title } from '@mantine/core'
import { Dots } from './Dots'
import classes from './Hero.module.css'

export function HeroText() {
	const scrollRef = useRef(null)

	const handleScroll = () => {
		if (scrollRef.current) {
			const scrollOptions = {
				top: scrollRef.current.offsetTop + 400,
				behavior: 'smooth',
			}
			window.scrollTo(scrollOptions)
		}
	}

	return (
		<Container className={classes.wrapper} size={1400} ref={scrollRef}>
			<Dots className={classes.dots} style={{ left: 0, top: 0 }} />
			<Dots className={classes.dots} style={{ left: 60, top: 0 }} />
			<Dots className={classes.dots} style={{ left: 0, top: 140 }} />
			<Dots className={classes.dots} style={{ right: 0, top: 60 }} />

			<div className={classes.inner}>
				<Title className={classes.title}>
					Объединение{' '}
					<Text component='span' className={classes.highlight} inherit>
						Excel файлов
					</Text>{' '}
					для вашего бизнеса
				</Title>

				<Container p={0} size={600}>
					<Text size='lg' c='dimmed' className={classes.description}>
						Мы предлагаем решение основанное на передовых алгоритмах, которое
						позволяет с легкостью объединять и структурировать данные из разных
						источников, минимизируя возможность ошибок и ускоряя процесс
						обработки. Попробуйте сами!
					</Text>
				</Container>

				<div className={classes.controls}>
					<Button
						className={classes.control}
						size='lg'
						variant='default'
						color='gray'
						onClick={handleScroll}
					>
						Посмотреть демо
					</Button>
					<Button className={classes.control} size='lg'>
						<a href='https://t.me/DZOIV'>Купить лицензию</a>
					</Button>
				</div>
			</div>
		</Container>
	)
}
