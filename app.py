from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

with open("health_data.json", "r", encoding="utf-8") as file:
    health_data = json.load(file)

def get_response(message, lang="english"):
    lang = lang.lower()
    message = message.lower()
    responses = health_data.get(lang, {})
    return responses.get(message, "Sorry, I no sabi dat one. Try another question.")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    language = data.get("language", "english")
    bot_response = get_response(user_message, language)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
