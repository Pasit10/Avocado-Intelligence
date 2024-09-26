from fastapi import HTTPException, status
from PIL import Image
import tensorflow as tf
import numpy as np
import base64
from io import BytesIO

import random

PATH_MODEL = "model/uFvgg16_augment_81.keras"
PATH_WEIGHTS = "model/model_by_dear_weights.weights.h5"

try :
    model = tf.keras.models.load_model(PATH_MODEL,compile=False)
    model.load_weights(PATH_WEIGHTS)
    # model.summary()
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
        image_bytes = base64.b64decode(customer_img)
        img = Image.open(BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
        img = np.array(img)
        img = np.expand_dims(img, axis=0)

        return img

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image data")

def predict(input_img:np.array):
    # Make predictions
    predictions = model.predict(input_img)
    print(predictions)

    # Find the index of the class with the highest prediction probability
    predicted_class_idx = np.argmax(predictions, axis=1)[0]
    print(predicted_class_idx)

    # Get the corresponding label from the dictionary
    predicted_race = CLASS_LABEL_RACE_DICT[predicted_class_idx]

    # make fake data
    output_list = []
    output_list.append(random.randint(0,1)) # random sex
    output_list.append(random.randint(0,100)) # random age
    output_list.append(random.randint(0,4)) # random race

    return_list = [CLASS_LABEL_SEX_DICT[output_list[0]],output_list[1],predicted_race]
    return return_list
