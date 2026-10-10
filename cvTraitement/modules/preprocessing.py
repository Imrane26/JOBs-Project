import cv2
import numpy as np

def preprocess_image(image_file):
    # Load the image
    original_image = cv2.imread(image_file)

    # Reduce noise
    denoised_image = cv2.medianBlur(original_image, 1)

    # Convert to grayscale
    gray_image = cv2.cvtColor(denoised_image, cv2.COLOR_BGR2GRAY)

    # Save the preprocessed image
    cv2.imwrite("../temp/processeDocument.png", gray_image)

    return gray_image
