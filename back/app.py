from flask import Flask, request, jsonify
import requests
import re
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize the sentiment analysis pipeline
# Using a model that can classify positive, neutral, and negative sentiments
sentiment_analyzer = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")

def extract_app_id(url):
    """
    Extract the app ID from the Steam game URL.
    """
    match = re.search(r'/app/(\d+)/', url)
    if match:
        return match.group(1)
    else:
        # Try matching without the trailing slash
        match = re.search(r'/app/(\d+)', url)
        if match:
            return match.group(1)
    return None

def fetch_reviews(app_id, num_reviews=200):
    """
    Fetch English reviews from the Steam API for the given app ID.
    """
    reviews = []
    cursor = '*'
    count = 0
    while count < num_reviews:
        params = {
            'json': 1,
            'num_per_page': min(100, num_reviews - count),  # Steam allows up to 100 reviews per page
            'cursor': cursor,
            'filter': 'recent',
            'language': 'english',  # Fetch only English reviews
            'purchase_type': 'all'
        }
        response = requests.get(f'https://store.steampowered.com/appreviews/{app_id}', params=params)
        data = response.json()
        if 'reviews' in data and data['reviews']:
            for review in data['reviews']:
                reviews.append(review['review'])
                count += 1
                if count >= num_reviews:
                    break
            cursor = data.get('cursor')
            if not cursor or cursor == 'AoIIPwAAAAA=':
                break  # No more reviews
        else:
            break  # No reviews found or end of reviews
    return reviews

def map_label_to_sentiment(label):
    """
    Map model output labels to 'Positive', 'Neutral', or 'Negative'.
    """
    if label in ['1 star', '2 stars']:
        return 'Negative'
    elif label == '3 stars':
        return 'Neutral'
    elif label in ['4 stars', '5 stars']:
        return 'Positive'
    else:
        return 'Neutral'

@app.route('/analyze', methods=['GET'])
def analyze():
    """
    Endpoint to analyze the sentiments of the reviews for a given Steam game URL.
    """
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    app_id = extract_app_id(url)
    if not app_id:
        return jsonify({'error': 'Invalid Steam URL'}), 400
    reviews = fetch_reviews(app_id)
    if not reviews:
        return jsonify({'error': 'No reviews found for this app ID'}), 404
    if len(reviews) < 20:
        return jsonify({'error': 'Not enough reviews to perform analysis'}), 400
    sentiments = {'Positive': 0, 'Neutral': 0, 'Negative': 0}
    reviews_with_sentiments = []
    for review in reviews:
        result = sentiment_analyzer(review[:512])[0]  # Truncate to 512 tokens if necessary
        sentiment = map_label_to_sentiment(result['label'])
        sentiments[sentiment] += 1
        reviews_with_sentiments.append({'text': review, 'sentiment': sentiment})
    response = jsonify({
        'sentiments': sentiments,
        'total_reviews_analyzed': len(reviews),
        'reviews': reviews_with_sentiments  # Return the reviews with sentiments
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
if __name__ == '__main__':
    app.run(debug=True)
