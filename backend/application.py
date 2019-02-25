# Start with a basic flask app webpage.
from flask import Flask, render_template, url_for, copy_current_request_context, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import os
import tarfile
from email.parser import Parser
import json

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['gz'])

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
            if importFile:
                filename = secure_filename(importFile.filename)
                importFile.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                
                if os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'], filename)):
                    print "File exists"

                tar = tarfile.open(os.path.join(app.config['UPLOAD_FOLDER'], filename), "r:gz")
                resp = []
                for member in tar.getmembers():
                    f = tar.extractfile(member)
                    if f is not None:
                        content = f.read()
                        
                        message = Parser().parsestr(content)
                        messageId = message['message-id']
                        to = message['to']
                        sender = message['from']
                        subject = message['subject']
                        date = message['date']

                        message_dictionary = {
                            "msg-id": messageId,
                            "to": to,
                            "sender": sender,
                            "subject": subject,
                            "date": date
                        }
                        
                        resp.append(message_dictionary)
                        resp = json.dumps(resp)
                        resp = json.loads(resp)

                return jsonify(resp)

    except Exception, e:
        return str(e)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')