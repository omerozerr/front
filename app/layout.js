// app/layout.js
import "./styles/globals.css";
import Link from "next/link";
import styles from "./styles/Layout.module.css";

export const metadata = {
    title: "My Portfolio",
    description: "Welcome to my portfolio website",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <nav className={styles.nav}>
                    <h2 className={styles.logo}>My Portfolio</h2>
                    <ul className={styles.navLinks}>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/steam-review">Steam Game Review</Link>
                        </li>
                        {/* Add more links as you create more pages */}
                    </ul>
                </nav>
                <main className={styles.mainContent}>{children}</main>
            </body>
        </html>
    );
}
