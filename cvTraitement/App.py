from flask import Flask, request, jsonify
from modules import preprocessing, ocrExtraction, traitementAI
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/process_cv', methods=['POST'])
def process_cv():
    # Récupérer l'image depuis la requête
    image_file = request.files['cv']

    # Créer le répertoire uploads s'il n'existe pas
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Enregistrer l'image téléchargée sur le disque
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_file.filename)
    image_file.save(image_path)

    # Prétraitement de l'image
    processed_image = preprocessing.preprocess_image(image_path)
    
    # Extraction OCR des données
    ocr_data = ocrExtraction.extract_text_from_image(image_path)
    
    # Traitement AI
    ai_response = traitementAI.traitementAi(ocr_data)

    return jsonify({'response': ai_response})

if __name__ == '__main__':
    app.run(debug=True)


### python -m flask --app .\app.py run