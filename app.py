from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
API_KEY = '2oyQQebXIukK3FhhziDgQPenyjkqoyqV1e3y5u1z'
BASE_URL = 'https://quizapi.io/api/v1/questions'

@app.route('/questions', methods=['GET'])
def get_questions():
    category = request.args.get('category')
    limit = request.args.get('limit')
    headers = {'X-Api-Key': API_KEY}
    params = {'category': category, 'limit': limit}
    response = requests.get(BASE_URL, headers=headers, params=params)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
