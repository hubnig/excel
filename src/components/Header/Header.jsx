import './Header.scss'

import logoSvg from './logo.svg'

export default function Header() {


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
					Innovation
				</div>
			</div>
		</div>
	)
}
