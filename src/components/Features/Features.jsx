import {
	Badge,
	Group,
	Title,
	Text,
	Card,
	SimpleGrid,
	Container,
	rem
} from '@mantine/core'
import { IconGauge, IconUser, IconCookie, Icon24Hours, IconArrowsJoin, IconGraph } from '@tabler/icons-react'
import classes from './Features.module.css'

const mockdata = [
	{
		title: 'Объединение файлов Excel',
		description:
			'Объединяйте несколько файлов Excel в один, чтобы создать единый исчерпывающий набор данных для анализа и отчетности.',
		icon: IconGauge,
	},
	{
		title: 'Быстрая редакция',
		description:
			'Редактируйте данные ваших файлов Excel непосредственно в приложении с помощью удобных инструментов и функций, что позволяет сэкономить время и повысить эффективность работы.',
		icon: IconUser,
	},
	{
		title: 'Составление отчетов',
		description:
			'Создавайте профессиональные отчеты на основе ваших данных из файлов Excel. Выбирайте из различных шаблонов, настраивайте структуру и добавляйте графики и диаграммы для наглядности.',
		icon: IconCookie,
	},
	{
		title: 'Экономия времени',
		description:
			'Оптимизируйте свой рабочий процесс, экономьте время и повышайте продуктивность благодаря автоматизации задач, быстрому доступу к данным и интуитивно понятному интерфейсу приложения.',
		icon: Icon24Hours,
	},
	{
		title: 'Персонализация и гибкость',
		description:
			'Настройте приложение под свои потребности, выбирая предпочтительные настройки, настраивая шаблоны отчетов и адаптируя интерфейс для максимального комфорта и удобства работы.',
		icon: IconArrowsJoin,
	},
	{
		title: 'Умный анализ данных',
		description:
			'Ваше приложение оснащено мощными алгоритмами анализа данных, которые помогут вам получить ценные инсайты и обнаружить скрытые паттерны в объединенных файлах Excel. Принимайте обоснованные решения на основе фактических данных.',
		icon: IconGraph,
	},
]

export function Features() {
	const features = mockdata.map(feature => (
		<Card
			key={feature.title}
			shadow='md'
			radius='md'
			className={classes.card}
			padding='xl'
		>
			<feature.icon
				style={{ width: rem(50), height: rem(50) }}
				stroke={2}
				color={'#95be9c'}
			/>
			<Text fz='lg' fw={500} className={classes.cardTitle} mt='md'>
				{feature.title}
			</Text>
			<Text fz='sm' c='dimmed' mt='sm'>
				{feature.description}
			</Text>
		</Card>
	))

	return (
		<Container size='lg' py='xl'>
			<Group className='highlight' justify='center'>
				<Badge className='highlight' variant='filled' size='lg'>
					Best company ever
				</Badge>
			</Group>
			<Title order={2} className={classes.title} ta='center' mt='sm'>
				Простая интеграция с любым технологическим стеком
			</Title>
			<Text c='dimmed' className={classes.description} ta='center' mt='md'>
				Время от времени вы увидите Голбата, у которого не хватает нескольких
				клыков. Это происходит, когда голод заставляет его попытаться укусить
				покемона Стального типа.
			</Text>
			<SimpleGrid cols={{ base: 1, md: 3 }} spacing='xl' mt={50}>
				{features}
			</SimpleGrid>
		</Container>
	)
}
