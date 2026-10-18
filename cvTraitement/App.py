from flask import Flask, request, jsonify
from modules import ocrExtraction, traitementAI
import os
from pathlib import Path
from uuid import uuid4

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024
ALLOWED_EXTENSIONS = {'.pdf', '.png', '.jpg', '.jpeg'}

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    return response

@app.route('/process_cv', methods=['POST', 'OPTIONS'])
def process_cv():
    if request.method == 'OPTIONS':
        return ('', 204)

    image_file = request.files.get('cv')
    if image_file is None or not image_file.filename:
        return jsonify({'error': 'Aucun fichier CV n’a été envoyé.'}), 400

    extension = Path(image_file.filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        return jsonify({'error': 'Format non pris en charge. Utilisez un PDF, PNG ou JPG.'}), 415

    # Créer le répertoire uploads s'il n'existe pas
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Enregistrer le fichier avec un nom ASCII sûr pour Windows.
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{uuid4().hex}{extension}")
    image_file.save(image_path)

    # Extraction OCR des données (image ou PDF).
    ocr_data = ocrExtraction.extract_text_from_image(image_path)
    
    # Traitement AI
    ai_response = traitementAI.traitementAi(ocr_data)

    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True)


### python -m flask --app .\app.py run
