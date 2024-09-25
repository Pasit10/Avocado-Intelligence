from fastapi import HTTPException, status
from PIL import Image
from tensorflow import keras
from keras.models import load_model
import numpy as np
import base64
from io import BytesIO

import random

try :
    # model = load_model('model/Fvgg16_augment_59.keras')
    # model.summary()
    pass
except FileNotFoundError :
    print("[model]: model not found")

CLASS_LABEL_SEX_DICT = {
    0: "male",
    1: "female"
}

CLASS_LABEL_RACE_DICT = {
    0: "White",
    1: "Black",
    2: "Asian",
    3: "Indian",
    4: "Others"
}


def processIMG(customer_img: str):
    try:
        # Decode the base64 image
        image_bytes = base64.b64decode(customer_img)

        # Use BytesIO to convert the byte data into a file-like object
        img = Image.open(BytesIO(image_bytes)).convert('RGB')

        # Convert the image to a NumPy array
        img = img.resize((224,224))
        img= np.array(img)

        return img  # or any relevant output you need

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image data")

def predict(input_img:np.array):
    # Make predictions
    # predictions = model.predict(input_img)

    # Output predictions
    # print(predictions)

    # make fake data
    output_list = []
    output_list.append(random.randint(0,1))
    output_list.append(random.randint(0,100))
    output_list.append(random.randint(0,4))

    return_list = [CLASS_LABEL_SEX_DICT[output_list[0]],output_list[1],CLASS_LABEL_RACE_DICT[output_list[2]]]
    return return_list
