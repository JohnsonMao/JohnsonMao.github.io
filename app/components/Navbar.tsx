import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';

function Navbar() {
	return (
		<nav className="sticky top-0 z-10 bg-slate-600 p-4 drop-shadow-xl">
			<div className="prose prose-xl mx-auto flex flex-col justify-between sm:flex-row">
				<Link
					href="/"
					className="text-white/90 no-underline hover:text-white"
				>
					Mao
				</Link>
				<ThemeSwitch />
			</div>
		</nav>
	);
}

export default Navbar;
