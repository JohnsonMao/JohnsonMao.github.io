import Navbar from './components/Navbar';
import './globals.css';

export const metadata = {
	title: "Mao's Blog",
	description: 'Created by Johnson Mao',
};

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="dark:bg-slate-800">
				<Navbar />
				{children}
			</body>
		</html>
	);
}

export default RootLayout;
