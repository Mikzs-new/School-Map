from flask import Flask, jsonify, request, render_template
from map import Map

map = Map()

app = Flask(__name__)

# Serve the HTML page
@app.route("/")
def home():
    return render_template("chatbot.html")

# API endpoint that JS will call
@app.route('/api/path')
def find_shortest_path():
    source = request.args.get('source', type=str)
    target = request.args.get('target', type=str)
    path = map.get_shortest_path(source, target)
    return jsonify(path)

@app.route("/api/locations")
def get_data():
    return jsonify(list(map.G.nodes()))

if __name__ == "__main__":
    print([p for p in map.get_multiple_paths('FGM 5th Floor Fire Exit', 'AGM 1st Floor Stairs 1')])

