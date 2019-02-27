# Start with a basic flask app webpage.
from flask import Flask, render_template, url_for, copy_current_request_context, request, jsonify
from flask_cors import CORS, cross_origin
import parser_factory
import json

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['gz', 'msg'])
ALLOWED_CONTENT = ["application/x-gzip", "application/octet-stream"]

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, resources={r'/api/upload': {'origins': 'http://localhost:8080'}})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['GET', 'POST'])
def fileUpload():  
    if request.method == 'POST':  
        importFile = request.files['file']         
        if importFile.content_type in ALLOWED_CONTENT:
            parser = parser_factory.FileParser.factory(importFile.content_type)
            response = parser.parse(importFile, UPLOAD_FOLDER)
            response = json.dumps(response)
            response = json.loads(response)
            return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')