from fastapi import HTTPException, status
from PIL import Image
from io import BytesIO
import numpy as np
import base64

import random

from model import model_ai

model_sex = model_ai.load_model_sex()
model_age = model_ai.load_model_age()
model_race = model_ai.load_model_race()

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
    # predict sex
    sex = model_sex.predict(input_img)
    sex_class_idx = np.argmax(sex, axis=1)[0]
    predicted_sex = CLASS_LABEL_SEX_DICT[sex_class_idx]

    # predict age
    predicted_age = model_age.predict(input_img)[0][0]
    predicted_age = round(predicted_age)

    # predict race
    race = model_race.predict(input_img)
    race_class_idx = np.argmax(race, axis=1)[0]
    predicted_race = CLASS_LABEL_RACE_DICT[race_class_idx]

    # make fake data
    # output_list = []
    # output_list.append(random.randint(0,1)) # random sex
    # output_list.append(random.randint(0,100)) # random age
    # output_list.append(random.randint(0,4)) # random race

    return_list = [predicted_sex, predicted_age, predicted_race]
    return return_list
