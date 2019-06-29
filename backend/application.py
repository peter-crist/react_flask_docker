# Start with a basic flask app webpage.
from flask import Flask, render_template, url_for, copy_current_request_context, request, jsonify
from flask_cors import CORS, cross_origin
import parser_factory
import json

import os
from werkzeug.utils import secure_filename

from xml.dom.pulldom import parse
from xml.sax import make_parser
from xml.sax.handler import feature_external_ges

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['gz', 'msg', 'xml'])
ALLOWED_CONTENT = ["application/x-gzip", "application/octet-stream", "application/xml"]

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, resources = {
    r'/api/upload': {'origins': 'http://localhost:8081'},
    r'/api/xml': {'origins': 'http://localhost:8081/'}
})

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

# Route added as an example for xxe injection
@app.route('/api/xml', methods=['GET', 'POST'])
def xml():
    parsed_xml = []
    if request.method == 'POST':
        xml = request.files['file']
        filename = secure_filename(xml.filename)
        xml.save(os.path.join(UPLOAD_FOLDER, filename))
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # Make the parser, set ext_ges to true to force it to process xxe
        parser = make_parser()
        parser.setFeature(feature_external_ges, True)
        xml_doc = parse(file_path, parser=parser)

        try:
            for event, node in xml_doc:
                parsed_xml.append([str(event), str(node)])
        except:
           return "Shit is fucked"
    return jsonify(parsed_xml) if parsed_xml else "Parsed xml fucked up"

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')