import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import { getSettings } from '@/lib/settings';

import './globals.css';

const settings = getSettings();

export const metadata = {
	title: settings.title,
	description: 'Created by Johnson Mao',
};

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="dark:bg-slate-800">
				<Providers>
					<Navbar title={settings.title} />
					{children}
				</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
