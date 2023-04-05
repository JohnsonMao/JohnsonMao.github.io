---
title: Test2
date: 2023-03-31
---

測試**部落格**

- 使用 `Next.js`
- 使用 `Tailwindcss`

1. Test1
2. Test2

```tsx showLineNumbers {8-11}
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
```
