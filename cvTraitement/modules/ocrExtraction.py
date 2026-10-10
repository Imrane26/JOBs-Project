import cv2
import os
import pytesseract
from img2table.document import Image
from img2table.ocr import TesseractOCR

def extract_text_from_image(image_file_path):
    # Lire l'image à l'aide de OpenCV
    image = cv2.imread(image_file_path)
    # Utilisation de Tesseract OCR pour extraire le texte de l'image
    text = pytesseract.image_to_string(image)
    
    # Création de l'objet Image
    img_obj = Image(image_file_path)

    # Utilisation de img2table pour extraire les tableaux de l'image
    ocr = TesseractOCR(n_threads=1, lang="eng")
    extracted_tables = img_obj.extract_tables(ocr=ocr,
                                            implicit_rows=True,
                                            borderless_tables=True,
                                            min_confidence=40)

    # Stockage des informations extraites dans une variable de type chaîne de caractères
    extracted_data = ""

    for table_index, table in enumerate(extracted_tables, start=1):
        extracted_data += f"Table {table_index}:\n"
        for row_index, row in enumerate(table.content.values(), start=1):
            for cell_index, cell in enumerate(row, start=1):
                extracted_data += f"Row {row_index}, Cell {cell_index}: {cell.value}\n"
            extracted_data += "\n"  # Ligne vide entre les lignes
        extracted_data += "\n"  # Ligne vide entre les tables
        
    # Combiner le texte extrait et les tableaux en une seule chaîne de caractères
    combined_data = extracted_data + text
    return combined_data
