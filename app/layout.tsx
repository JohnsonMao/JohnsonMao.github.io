import { Providers } from './providers';
import Navbar from './components/Navbar';

import './globals.css';
import './styles/prism-dracula.css';
import './styles/prism-plus.css';

export const metadata = {
	title: "Mao's Blog",
	description: 'Created by Johnson Mao',
};

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="dark:bg-slate-800">
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
