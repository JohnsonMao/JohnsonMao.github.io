import type { Metadata } from 'next';

import config from '@/assets/configs';
import Navbar from '@/components/Navbar';

import { Providers } from './providers';

import '../assets/css/globals.css';

const { meta, navbar } = config;

export const metadata: Metadata = {
	title: meta.title,
	description: meta.description,
	authors: meta.authors
};

function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="dark:bg-slate-800">
				<Providers>
					<Navbar {...navbar} />
					{children}
				</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
