// app/steam-review/page.js
"use client";

import { useState } from "react";
import styles from "../styles/SteamReview.module.css";

export default function SteamReview() {
    const [url, setUrl] = useState("");
    const [reviews, setReviews] = useState([]); // Store all reviews with sentiments
    const [sentiments, setSentiments] = useState(null);
    const [totalReviews, setTotalReviews] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [randomComment, setRandomComment] = useState(""); // For displaying random comment

    const analyzeSentiments = async (e, gameUrl = null) => {
        if (e) {
            e.preventDefault();
        }
        setLoading(true);
        setError(null);
        setSentiments(null);
        setTotalReviews(null);
        setRandomComment(""); // Reset random comment
        setReviews([]); // Reset reviews

        const analysisUrl = gameUrl || url;

        try {
            const response = await fetch(
                `http://127.0.0.1:5500/analyze?url=${encodeURIComponent(
                    analysisUrl
                )}`
            );
            const data = await response.json();
            if (response.ok) {
                setSentiments(data.sentiments);
                setTotalReviews(data.total_reviews_analyzed);
                setReviews(data.reviews); // Store reviews with sentiments
            } else {
                setError(data.error || "An error occurred");
            }
        } catch (err) {
            setError("Failed to fetch data from the server");
        }
        setLoading(false);
    };

    // Function to handle showing random comment
    const showRandomComment = (sentimentType) => {
        if (reviews && reviews.length > 0) {
            const filteredReviews = reviews.filter(
                (review) => review.sentiment === sentimentType
            );
            if (filteredReviews.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * filteredReviews.length
                );
                setRandomComment(filteredReviews[randomIndex].text);
            } else {
                setRandomComment(
                    `No ${sentimentType.toLowerCase()} comments available.`
                );
            }
        } else {
            setRandomComment("No reviews analyzed yet.");
        }
    };

    return (
        <div className={styles.pageContainer}>
            <h1>Steam Game Reviews Sentiment Analysis</h1>

            {/* Description Section */}
            <div className={styles.description}>
                <h2>Purpose</h2>
                <p>
                    The Steam Game Reviews Sentiment Analysis component is
                    designed to help users gain insights into the overall
                    sentiment of player reviews for any game available on the
                    Steam platform. By analyzing recent English-language
                    reviews, the tool categorizes feedback into positive,
                    neutral, and negative sentiments. This empowers gamers to
                    make informed decisions before purchasing a game and
                    provides developers with valuable feedback on player
                    perceptions.
                </p>

                <h2>How to Use</h2>
                <ul>
                    <li>
                        <strong>Enter a Steam Game URL:</strong>
                        <p>
                            Simply paste the URL of a Steam game into the input
                            field provided. For example:
                        </p>
                        <ul>
                            <li>
                                <a
                                    href="https://store.steampowered.com/app/252490/Rust/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://store.steampowered.com/app/252490/Rust/
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://store.steampowered.com/app/1091500/Cyberpunk_2077/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://store.steampowered.com/app/1091500/Cyberpunk_2077/
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Use Quick Access Buttons:</strong>
                        <p>
                            Click on the &quot;Analyze Rust&quot; or
                            &quot;Analyze Cyberpunk 2077&quot; buttons to
                            automatically input the game&apos;s URL and initiate
                            the analysis without manual entry.
                        </p>
                    </li>
                    <li>
                        <strong>View Sentiment Analysis Results:</strong>
                        <p>
                            After submitting, the tool fetches up to 200 recent
                            English reviews for the selected game. It then
                            processes these reviews using a sentiment analysis
                            model to determine the number of positive, neutral,
                            and negative comments. The results are displayed on
                            the page, showing the sentiment distribution and the
                            total number of reviews analyzed.
                        </p>
                    </li>
                </ul>
            </div>
            <br />
            <br />

            {/* Form Section */}
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

                    {/* Buttons to Show Random Comments */}
                    <div style={{ marginTop: "1rem" }}>
                        <button
                            onClick={() => showRandomComment("Positive")}
                            className={styles.button}
                        >
                            Show Random Positive Comment
                        </button>
                        <button
                            onClick={() => showRandomComment("Neutral")}
                            className={styles.button}
                        >
                            Show Random Neutral Comment
                        </button>
                        <button
                            onClick={() => showRandomComment("Negative")}
                            className={styles.button}
                        >
                            Show Random Negative Comment
                        </button>
                    </div>

                    {/* Display Random Comment */}
                    {randomComment && (
                        <div style={{ marginTop: "1rem" }}>
                            <h3>Random Comment:</h3>
                            <p>&quot;{randomComment}&quot;</p>
                        </div>
                    )}
                </div>
            )}
            <br />
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
                    <li>
                        <strong>React Hooks (useState):</strong> For managing
                        component state and updates.
                    </li>
                    <li>
                        <strong>JavaScript Fetch API:</strong> To make
                        asynchronous HTTP requests to the backend API.
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
                        performing sentiment analysis with pre-trained NLP
                        models (
                        <code>
                            nlptown/bert-base-multilingual-uncased-sentiment
                        </code>
                        ).
                    </li>
                    <li>
                        <strong>Flask-CORS:</strong> A Flask extension to handle
                        Cross-Origin Resource Sharing (CORS), allowing the
                        frontend and backend to communicate despite being on
                        different ports.
                    </li>
                    <li>
                        <strong>Python Libraries:</strong>
                        <ul>
                            <li>
                                <strong>Requests:</strong> To fetch game reviews
                                from the Steam Web API.
                            </li>
                            <li>
                                <strong>Re (Regular Expressions):</strong> For
                                parsing and extracting the Steam game app ID
                                from URLs.
                            </li>
                        </ul>
                    </li>
                </ul>
                <p>
                    <strong>APIs and Data Sources:</strong>
                </p>
                <ul>
                    <li>
                        <strong>Steam Web API:</strong> Provides access to game
                        reviews and related data based on the app ID extracted
                        from the game URL.
                    </li>
                </ul>
            </div>
        </div>
    );
}
