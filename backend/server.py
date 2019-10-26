from flask import Flask
app = Flask(__name__)

@app.route('/query', methods=['POST'])
def simple_query():
    query = request.form['query']
    year = request.form['year']

    return None