from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os
from werkzeug.middleware.proxy_fix import ProxyFix


load_dotenv()
app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Replace with your bot token and chat ID
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')
TELEGRAM_API_URL = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/'
SECRET_TOKEN = os.getenv("TELEGRAM_WEBHOOK_SECRET_TOKEN")

# Route to send a message to Telegram
@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    message = data.get('message')

    if not message:
        return jsonify({'error': 'Message is required'}), 400

    send_url = f'{TELEGRAM_API_URL}sendMessage'
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message
    }

    response = requests.post(send_url, json=payload)
    if response.status_code == 200:
        return jsonify({'status': 'Message sent'}), 200
    else:
        return jsonify({'error': 'Failed to send message'}), 500

# Route to receive messages from Telegram (Webhook)
@app.route('/webhook', methods=['POST', 'GET'])
def webhook():
    if request.method == 'GET':
        return "Webhook is ready!", 200

    update = request.json
    print("Full update:", update)  # Debug print
    
    # Telegram sends updates in this format
    if 'message' in update:
        message = update['message']
    elif 'edited_message' in update:
        message = update['edited_message']
    else:
        print("No message in update")
        return jsonify({'status': 'ok'}), 200
    
    text = message.get('text')
    chat_id = message.get('chat', {}).get('id')
    user = message.get('from', {}).get('first_name', 'Unknown')
    
    if text:
        print(f"Received message from {user}: {text} (chat ID: {chat_id})")
    else:
        print("Message with no text received:", message)
    
    return jsonify({'status': 'ok'}), 200

@app.route('/test', methods=['POST'])
def test():
    print("Test received:", request.json)
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(debug=True)