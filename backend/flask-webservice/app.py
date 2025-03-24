from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Replace with your bot token and chat ID
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')
TELEGRAM_API_URL = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/'

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
@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    message = data.get('message')

    if message:
        text = message.get('text')
        chat_id = message.get('chat', {}).get('id')
        print(f"Received message: {text} from chat ID: {chat_id}")

        # You can process the message here (e.g., save to CRM)
        return jsonify({'status': 'Message received'}), 200
    else:
        return jsonify({'error': 'No message found'}), 400

if __name__ == '__main__':
    app.run(debug=True)