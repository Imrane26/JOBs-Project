#traitementAI.py
import json
import os
import re
import google.generativeai as genai

# La clé reste dans l'environnement local et ne doit jamais être publiée.
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
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

def _parse_model_json(response_text):
    """Extract the first valid JSON object from Gemini's response.

    Gemini may wrap the object in an explanation or a ```json code block,
    even when the prompt asks for JSON only.
    """
    text = (response_text or "").strip()
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text, flags=re.IGNORECASE).strip()

    decoder = json.JSONDecoder()
    for match in re.finditer(r"[\[{]", text):
        try:
            parsed, _ = decoder.raw_decode(text[match.start():])
            if isinstance(parsed, (dict, list)):
                return parsed
        except json.JSONDecodeError:
            continue

    preview = text[:300].replace("\n", " ")
    raise ValueError(f"La réponse Gemini ne contient pas de JSON valide: {preview}")

def traitementAi(data):
    # Initialiser le modèle GenerativeModel
    model = genai.GenerativeModel(model_name="gemini-3.8-flash",
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
  "educations": [
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
    parsed_json = _parse_model_json(convo.last.text)
    
    
    
    return parsed_json
