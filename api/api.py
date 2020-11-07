from flask import Flask
from flask import send_file, jsonify, request

app = Flask(__name__)

@app.route('/')
def hello():
    return "welcome to who's your ddy api"

@app.route('/get-mom-dad-child', methods=['POST'])
def uploadImage():
    try:
        dad = request.files['dad']
        mom = request.files['mom']
        child = request.files['child']
        
        return jsonify(success=True)
        
    except:
        return jsonify(success=False)

if __name__ == '__main__':
    app.run()