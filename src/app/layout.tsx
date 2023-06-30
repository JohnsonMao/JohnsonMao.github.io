import type { Metadata } from 'next';
import Navbar from '@components/Navbar';
import { getConfig } from '@utils/config';
import { Providers } from './providers';

import '../assets/css/globals.css';

const { meta, navbar } = getConfig();

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
