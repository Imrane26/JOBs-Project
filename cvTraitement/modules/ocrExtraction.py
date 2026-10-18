import cv2
import os
import tempfile
from pathlib import Path
import fitz
import pytesseract
from img2table.document import Image
from img2table.ocr import TesseractOCR

TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
if os.path.exists(TESSERACT_PATH):
    os.environ["PATH"] = os.path.dirname(TESSERACT_PATH) + os.pathsep + os.environ.get("PATH", "")
    pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

def _extract_text_from_image(image_file_path):
    # Lire l'image à l'aide de OpenCV
    image = cv2.imread(image_file_path)
    if image is None:
        raise ValueError(f"OpenCV cannot read this file as an image: {image_file_path}")

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


def extract_text_from_image(image_file_path):
    """Extract text from an image or a PDF, including scanned PDFs."""
    extension = Path(image_file_path).suffix.lower()
    if extension != ".pdf":
        return _extract_text_from_image(image_file_path)

    page_results = []
    with fitz.open(image_file_path) as document, tempfile.TemporaryDirectory() as temp_dir:
        for page_number, page in enumerate(document):
            native_text = page.get_text("text").strip()
            pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            rendered_path = os.path.join(temp_dir, f"page-{page_number + 1}.png")
            pixmap.save(rendered_path)
            ocr_text = _extract_text_from_image(rendered_path)
            page_results.append(
                f"Page {page_number + 1}:\n{native_text}\n{ocr_text}".strip()
            )

    return "\n\n".join(page_results)
