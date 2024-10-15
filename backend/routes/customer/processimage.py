from fastapi import HTTPException, status
from PIL import Image
from io import BytesIO
import numpy as np
import cv2
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
        # ถอดรหัส base64 เป็น image bytes
        image_bytes = base64.b64decode(customer_img)
        img = Image.open(BytesIO(image_bytes)).convert('RGB')

        # แปลงภาพเป็น numpy array
        img_np = np.array(img)

        # โหลด Haar Cascade classifier
        face_cascade = cv2.CascadeClassifier("backend/config/haarcascade_frontalface_default.xml")

        # แปลงภาพเป็น grayscale เพื่อใช้ในการตรวจจับใบหน้า
        gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)

        # ตรวจจับใบหน้า
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        if len(faces) > 0:
            # ใช้ใบหน้าแรกที่ตรวจพบ
            (x, y, w, h) = faces[0]

            # ครอบใบหน้า
            cropped_face = img_np[y:y+h, x:x+w]

            # แปลงใบหน้าที่ถูกครอบให้เป็นขนาด 224x224 (ตามที่คุณต้องการ)
            cropped_face = cv2.resize(cropped_face, (224, 224))

            # แปลงภาพจาก RGB เป็น BGR ก่อนบันทึก
            cropped_face_bgr = cv2.cvtColor(cropped_face, cv2.COLOR_RGB2BGR)

            # บันทึกใบหน้าที่ถูกครอบลงในไฟล์ (ต้องระบุส่วนขยายไฟล์เช่น .jpg หรือ .png)
            cv2.imwrite('backend/test_only/crop_img.jpg', cropped_face_bgr)
            print(f"Cropped face saved as {'backend/test_only/crop_img.jpg'}")

            # เพิ่มมิติสำหรับการใช้งานในโมเดล
            cropped_face_bgr = np.expand_dims(cropped_face_bgr, axis=0)  # เพิ่มมิติ batch ที่นี่

            return cropped_face_bgr
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No faces detected in the image")

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image data")

# def processIMG(customer_img: str):
#     try:
#         image_bytes = base64.b64decode(customer_img)
#         img = Image.open(BytesIO(image_bytes)).convert('RGB')
#         img = img.resize((224, 224))
#         img = np.array(img)
#         img = np.expand_dims(img, axis=0)

#         return img

#     except Exception as e:
#         print(e)
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image data")


def predict(input_img:np.array):
    # predict sex
    sex = model_sex.predict(input_img)
    sex_class_idx = 0 if sex[0][0] <= 0.5 else 1
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
