// app/steam-review/page.js
"use client";

import { useState } from "react";
import styles from "../styles/SteamReview.module.css";

export default function SteamReview() {
    const [url, setUrl] = useState("");
    const [sentiments, setSentiments] = useState(null);
    const [totalReviews, setTotalReviews] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeSentiments = async (e, gameUrl = null) => {
        if (e) {
            e.preventDefault();
        }
        setLoading(true);
        setError(null);
        setSentiments(null);
        setTotalReviews(null);

        const analysisUrl = gameUrl || url;

        try {
            const response = await fetch(
                `http://127.0.0.1:5000/analyze?url=${encodeURIComponent(
                    analysisUrl
                )}`
            );
            const data = await response.json();
            if (response.ok) {
                setSentiments(data.sentiments);
                setTotalReviews(data.total_reviews_analyzed);
            } else {
                setError(data.error || "An error occurred");
            }
        } catch (err) {
            setError("Failed to fetch data from the server");
        }
        setLoading(false);
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Steam Game Sentiment Analysis</h1>
            <form onSubmit={analyzeSentiments}>
                <label htmlFor="url">Enter Steam Game URL:</label>
                <br />
                <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={styles.input}
                    placeholder="https://store.steampowered.com/app/252490/Rust/"
                    required
                />
                <br />
                <button type="submit" className={styles.button}>
                    Analyze
                </button>
            </form>

            <h3>Or select a game:</h3>
            <button
                onClick={() =>
                    analyzeSentiments(
                        null,
                        "https://store.steampowered.com/app/252490/Rust/"
                    )
                }
                className={styles.button}
            >
                Analyze Rust
            </button>
            <button
                onClick={() =>
                    analyzeSentiments(
                        null,
                        "https://store.steampowered.com/app/1091500/Cyberpunk_2077/"
                    )
                }
                className={styles.button}
            >
                Analyze Cyberpunk 2077
            </button>

            {loading && <p>Loading...</p>}

            {error && (
                <p style={{ color: "red", marginTop: "1rem" }}>
                    Error: {error}
                </p>
            )}

            {sentiments && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Sentiment Analysis Results</h2>
                    <p>Total Reviews Analyzed: {totalReviews}</p>
                    <ul>
                        <li>Positive: {sentiments.Positive}</li>
                        <li>Neutral: {sentiments.Neutral}</li>
                        <li>Negative: {sentiments.Negative}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
