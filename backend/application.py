# Start with a basic flask app webpage.
from flask import Flask, render_template, url_for, copy_current_request_context, request
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import os

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
    if request.method == 'POST':
      f = request.files['file']
      f.save(secure_filename(f.filename))
      return 'file uploaded successfully'

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')