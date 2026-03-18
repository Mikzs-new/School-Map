from flask import Flask, jsonify, request, render_template
from . import map


app = Flask(__name__)

# Serve the HTML page
@app.route("/")
def home():
    return render_template("chatbot.html")

# API endpoint that JS will call
@app.route('/api/path')
def find_path():
    source = request.args.get('source', type=str)
    target = request.args.get('target', type=str)

    path = nx.shortest_path(G, source=source, target=target)
    return jsonify(path)

@app.route("/api/locations")
def get_data():
    return jsonify(list(G.nodes()))

if __name__ == "__main__":
    app.run(debug=True)

