from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Load health data with error handling
HEALTH_DATA_PATH = os.path.join('data', 'health_data.json')
try:
    with open(HEALTH_DATA_PATH, 'r', encoding='utf-8') as f:
        health_data = json.load(f)
except Exception as e:
    print(f"Error loading {HEALTH_DATA_PATH}: {e}")
    health_data = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_advice', methods=['POST'])
def get_advice():
    user_input = request.json.get('message', '')
    lang = request.json.get('lang', 'en')
    for item in health_data:
        if item.get("condition", "").lower() in user_input.lower():
            advice = item.get("advice", {})
            return jsonify({"response": advice.get(lang, advice.get("en", "No advice available."))})
    # Fallback responses for different languages
    fallback = {
        "en": "Sorry, I don't understand. Can you rephrase?",
        "ha": "Yi hakuri, ban gane ba. Da fatan za ka iya sake fadi.",
        "pg": "No vex, I no understand. Fit talk am again?"
    }
    return jsonify({"response": fallback.get(lang, fallback["en"])})

# Optional: Endpoint to get all health conditions (for frontend dropdowns, etc.)
@app.route('/list_conditions', methods=['GET'])
def list_conditions():
    return jsonify({"conditions": [item.get("condition", "") for item in health_data]})

if __name__ == '__main__':
    # For development only; use gunicorn or waitress for production!
    app.run(host='0.0.0.0', port=5000)
