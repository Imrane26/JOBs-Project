#traitementAI.py
import json
import os
import google.generativeai as genai

#setup Api key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

def traitementAi(data):
    # Initialiser le modèle GenerativeModel
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)

    # Démarrer une session de chat avec le modèle
    convo = model.start_chat(history=[])

    # Envoyer un message contenant les données extraites comme prompt
    convo.send_message("""d'aprés ce text extraire les information suivant ({
  "email": "candidatTest@example.com",
  "prenom": "",
  "nom": "",
  "adresse": "",
  "telephone": "",
  "date_naissance": "",
  "education": [
    {
      "diplome": "",
      "institut": "",
      "date_debut": "",
      "date_fin": "",
      "description": ""
    },
    {
      "diplome": "",
      "institut": "",
      "date_debut": "",
      "date_fin": "",
      "description": ""
    }
  ],
  "experiences": [
    {
      "poste": "",
      "entreprise": "",
      "date_debut":"",
      "date_fin": "",
      "description": ""
    },
    {
      "poste": "",
      "entreprise": "",
      "date_debut": "",
      "date_fin": "",
      "description": ""
    }
  ],
  "competences": [
    {"competence": ""},
    {"competence": ""},
    {"competence": ""},
    ....
  ]
}
  en format d'un objet JSON si vous avez ne trouve une infrmotion return avec la value NULL voici les text ("""+data+""")?""")
    
    # Imprimer la réponse du modèle
    print(convo.last.text)
    
    # Retourner la réponse
    result_json = convo.last.text
    cleaned_text = result_json.strip().replace('json', '').replace('`', '')
    parsed_json = json.loads(cleaned_text)
    
    
    
    return parsed_json
