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
        </div>
    );
}
