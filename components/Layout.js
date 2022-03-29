import Head from "next/head";
import favicon from "public/favicon.ico";
import headicon from "public/head-icon.webp"

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<link rel="shortcut icon" href={headicon.src}/>
				<title>CRUD Application Using NEXT.js</title>
			</Head>
			{children}
		</main>
	);
}
