import ExcelMerger from "./components/Excel/Excel";
import './App.scss'
import Header from "./components/Header/Header";
import Desc from "./components/Desc/Desc";
import { HeroText } from "./components/Hero/Hero";
import { Features } from "./components/Features/Features";

export default function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<HeroText />
				<Features />
				<Desc />
				<ExcelMerger />
			</div>
		</div>
	)
}