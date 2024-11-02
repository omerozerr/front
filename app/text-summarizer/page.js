// app/text-summarizer/page.js
"use client";

import { useState } from "react";
import styles from "../styles/TextSummarizer.module.css";

export default function TextSummarizer() {
    const [inputText, setInputText] = useState("");
    const [inputURL, setInputURL] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const summarizeText = async () => {
        if (!inputText.trim()) {
            setError("Please enter some text to summarize.");
            return;
        }
        setLoading(true);
        setError(null);
        setSummary("");

        try {
            const response = await fetch("http://127.0.0.1:5500/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: inputText,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setSummary(data.summary);
            } else {
                setError(data.error || "An error occurred");
            }
        } catch (err) {
            setError("Failed to fetch data from the server");
        }

        setLoading(false);
    };

    const summarizeURL = async () => {
        if (!inputURL.trim()) {
            setError("Please enter a URL to summarize.");
            return;
        }
        setLoading(true);
        setError(null);
        setSummary("");

        try {
            const response = await fetch("http://127.0.0.1:5500/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: inputURL,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setSummary(data.summary);
            } else {
                setError(data.error || "An error occurred");
            }
        } catch (err) {
            setError("Failed to fetch data from the server");
        }

        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h1>Text Summarization Tool</h1>

            {/* Description Section */}
            <div className={styles.description}>
                <h2>Purpose</h2>
                <p>
                    The Text Summarization Tool is designed to help users
                    quickly obtain concise summaries of long pieces of text or
                    articles from the web. Whether you&apos;re trying to grasp
                    the main points of a lengthy article, research paper, or any
                    substantial document, this tool leverages T5 model from
                    Hugging Face
                </p>

                <h2>How to Use</h2>
                <ul>
                    <li>
                        <strong>Summarize Text:</strong>
                        <p>
                            Enter or paste the text you wish to summarize into
                            the provided text area. Click the &quot;Summarize
                            Text&quot; button to generate a concise summary of
                            the input text.
                        </p>
                    </li>
                    <li>
                        <strong>Summarize Article from URL:</strong>
                        <p>
                            Input the URL of an article you want to summarize
                            into the URL input field. Click the &quot;Summarize
                            URL&quot; button, and the tool will extract the main
                            content from the webpage and provide a summarized
                            version.
                        </p>
                        <p>
                            <em>Note:</em> This works best with direct links to
                            news articles or blog posts. Some websites may not
                            be supported due to content restrictions or
                            technical limitations.
                        </p>
                    </li>
                </ul>
            </div>

            {/* Text Input Section */}
            <div className={styles.inputSection}>
                <h2>Summarize Text</h2>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={10}
                    placeholder="Enter text here..."
                    className={styles.textarea}
                />
                <button onClick={summarizeText} className={styles.button}>
                    Summarize Text
                </button>
            </div>

            <p className={styles.or}>OR</p>

            {/* URL Input Section */}
            <div className={styles.inputSection}>
                <h2>Summarize Article from URL</h2>
                <input
                    type="text"
                    value={inputURL}
                    onChange={(e) => setInputURL(e.target.value)}
                    placeholder="Enter URL here..."
                    className={styles.input}
                />
                <button onClick={summarizeURL} className={styles.button}>
                    Summarize URL
                </button>
            </div>

            {loading && <p>Loading...</p>}

            {error && <p className={styles.error}>Error: {error}</p>}

            {summary && (
                <div className={styles.summaryContainer}>
                    <h2>Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}

            {/* Technologies Used Section */}
            <div className={styles.description}>
                <h2>Technologies Used</h2>
                <p>
                    <strong>Frontend:</strong>
                </p>
                <ul>
                    <li>
                        <strong>Next.js:</strong> A React framework for building
                        the user interface and handling client-side rendering.
                    </li>
                </ul>
                <p>
                    <strong>Backend:</strong>
                </p>
                <ul>
                    <li>
                        <strong>Flask:</strong> A lightweight Python web
                        framework used to create the backend API that processes
                        requests.
                    </li>
                    <li>
                        <strong>Hugging Face Transformers:</strong> Utilized for
                        performing text summarization with pre-trained NLP
                        models (<code>t5-base</code>).
                    </li>

                    <li>
                        <strong>Python Libraries:</strong>
                        <ul>
                            <li>
                                <strong>Newspaper3k:</strong> To extract article
                                text from URLs for summarization.
                            </li>
                            <li>
                                <strong>Requests:</strong> To handle HTTP
                                requests within the backend.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}
