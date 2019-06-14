from flask import Flask, render_template, send_from_directory

app = Flask(__name__, template_folder='templates', static_url_path='')

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/resources/<path:filename>')
def send_file(filename):
    return send_from_directory('resources', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
