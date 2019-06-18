from flask import Flask, render_template, send_from_directory, request, make_response, jsonify
from flask_cors import CORS
import sys

app = Flask(__name__, template_folder='templates', static_url_path='')

CORS(app)

@app.route("/", methods=['GET'])
def index():
    print(request.headers, file=sys.stderr)
    response        = make_response(render_template('index.html'))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/resources/<path:filename>', methods=['GET'])
def send_file(filename):
    print(request.headers, file=sys.stderr)
    answer = send_from_directory('resources', filename)
    answer.headers.set('Access-Control-Allow-Origin', '*')
    return answer

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
