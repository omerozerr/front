// app/page.js
import styles from "./styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <h1>Welcome to My Portfolio</h1>
            <p>
                Hi! I&apos;m Ömer Özer. This is my portfolio where I showcase my
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
            <br></br>
            <p>
                All of the small projects in the other tabs of this page were
                created using ready-made models from Hugging Face. The aim was
                to practice the use of Hugging Face and ready-made models in
                general. Besides that, I wanted to create a small page like this
                to increase my full-stack experience. The front end was created
                using Next.js. The backend was created using Flask. All models
                work on the backend.
            </p>
            <br></br>
            <p style={{ fontWeight: "bold" }}>
                If you want to see my architectures created from scratch using
                PyTorch, you can check out{" "}
                <a
                    href="https://github.com/omerozerr/nlp" // replace with your actual repo link
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0070f3" }}
                >
                    this repo
                </a>
                .
            </p>
        </div>
    );
}
