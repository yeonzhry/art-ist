from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import cv2
from cvzone.HandTrackingModule import HandDetector
import math
import mysql.connector
import datetime

# ========================
# FastAPI 기본 설정
# ========================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    'user': 'admin',
    'password': 'Zmt7rwtt64',
    'host': 'database-1.cv42kwy26xf8.ap-northeast-2.rds.amazonaws.com',
    'database': 'fastapi-ca'
}

# ========================
# 유저 생성 모델
# ========================
class UserCreate(BaseModel):
    name: str

# ========================
# /users - 이름 중복 처리 후 저장
# ========================
@app.post("/users")
async def create_user(user: UserCreate):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor(dictionary=True)

       base_name = (user.name or "").strip()
if not base_name:
    raise HTTPException(status_code=400, detail="Name is required")

        # 기존 이름 조회
        cursor.execute("SELECT name FROM User WHERE name LIKE %s", (base_name + '%',))
        existing_names = [row["name"] for row in cursor.fetchall()]

        # 중복 처리
        new_name = base_name
        count = 1
        while new_name in existing_names:
            new_name = f"{base_name}{count}"
            count += 1

        # DB에 INSERT (user_id는 AUTO_INCREMENT)
        cursor.execute("INSERT INTO User (name) VALUES (%s)", (new_name,))
        conn.commit()
        user_db_id = cursor.lastrowid  # AUTO_INCREMENT로 생성된 ID

        return {"message": "User created", "name": new_name, "user_id": user_db_id}

    except mysql.connector.Error as err:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {err}")

    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# ========================
# DB 예측 저장 함수
# ========================
def save_prediction_to_db(user_id, prediction_index):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = ("INSERT INTO predictions (user_id, prediction_index, timestamp) "
                 "VALUES (%s, %s, %s)")
        cursor.execute(query, (user_id, int(prediction_index), timestamp))
        conn.commit()
    except mysql.connector.Error as err:
        print(f"DB Error: {err}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

# ========================
# 모델 & 손 감지 초기화
# ========================
model = tf.keras.models.load_model("keras_model.h5")
labels = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"]
detector = HandDetector(maxHands=1)
offset = 20
imgSize = 300

# ========================
# /predict - 손 이미지 예측
# ========================
@app.post("/predict")
async def predict(file: UploadFile = File(...), user_id: int = None):
    if not user_id:
        raise HTTPException(status_code=400, detail="user_id is required")

    try:
        contents = await file.read()
        img_pil = Image.open(io.BytesIO(contents)).convert("RGB")
        img_cv = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)

        hands, _ = detector.findHands(img_cv)
        if not hands:
            return {"prediction": [{"label": "No Hand", "confidence": 0.0}]}

        hand = hands[0]
        x, y, w, h = hand['bbox']

        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
        imgCrop = img_cv[y-offset:y+h+offset, x-offset:x+w+offset]

        if imgCrop.size <= 0:
            return {"prediction": [{"label": "No Hand", "confidence": 0.0}]}

        aspectRatio = h / w
        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            wGap = math.ceil((imgSize - wCal) / 2)
            imgWhite[:, wGap:wCal+wGap] = imgResize
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            hGap = math.ceil((imgSize - hCal) / 2)
            imgWhite[hGap:hCal+hGap, :] = imgResize

        img_final = cv2.resize(imgWhite, (224, 224))
        img_array = np.expand_dims(np.array(img_final)/255.0, axis=0)

        pred = model.predict(img_array, verbose=0)
        idx = int(np.argmax(pred))
        confidence = float(np.max(pred))
        label = labels[idx]

        save_prediction_to_db(user_id, idx)

        return {"prediction": [{"label": label, "confidence": confidence}]}

    except Exception as e:
        return {"error": str(e)}

# ========================
# 서버 실행
# ========================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
