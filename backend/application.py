# Start with a basic flask app webpage.
from flask import Flask, render_template, url_for, copy_current_request_context, request, jsonify
from flask_cors import CORS, cross_origin
import parser_factory

import json

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['gz', 'msg'])

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, resources={r'/api/upload': {'origins': 'http://localhost:8080'}})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['GET', 'POST'])
@cross_origin(headers=['Content-Type'])
def fileUpload():
    try:
        if request.method == 'POST':  
            importFile = request.files['file']         
            if importFile.content_type == "application/x-gzip" or importFile.content_type == "application/octet-stream":
                parser = parser_factory.FileParser.factory(importFile.content_type)
                resp = parser.parse(importFile, UPLOAD_FOLDER)
                resp = json.dumps(resp)
                resp = json.loads(resp)
                return jsonify(resp)

    except Exception, e:
        return str(e)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')