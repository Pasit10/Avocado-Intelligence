from fastapi import HTTPException, status
from PIL import Image
import tensorflow as tf
import numpy as np
import base64
from io import BytesIO

try :
    model = tf.keras.models.load_model('model/Fvgg16_augment_59.keras')
    model.summary()
except FileNotFoundError :
    print("[model]: model not found")

def processIMG(customer_img: str):
    try:
        # Decode the base64 image
        image_bytes = base64.b64decode(customer_img)

        # Use BytesIO to convert the byte data into a file-like object
        img = Image.open(BytesIO(image_bytes)).convert('RGB')

        # Convert the image to a NumPy array
        img = img.resize((224,224))
        img= np.array(img)
        print(img.shape)

        return img  # or any relevant output you need

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image data")

def predict(input_img:np.array):
    pass
    # Make predictions
    # predictions = model.predict(input_img)

    # # Output predictions
    # print(predictions)