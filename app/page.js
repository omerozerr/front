// app/page.js
import styles from "./styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <h1>Welcome to My Portfolio</h1>
            <p>
                Hi! I'm Ömer Özer. This is my portfolio where I showcase my
                small NLP projects.
            </p>
            <p>
                Feel free to check out my work and connect with me on{" "}
                <a
                    href="https://github.com/omerozerr"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                .
            </p>
            {/* Add more content as desired */}
        </div>
    );
}
