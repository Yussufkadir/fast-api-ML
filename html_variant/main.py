from enum import Enum
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

class ModelInput(BaseModel):
    feature1: float
    feature2: float
    feature3: float
    feature4: float


app = FastAPI(title="Simple ML app")
model = joblib.load("trained_model.joblib")

origins = [
    "https://localhost",
    "https://127.0.0.1"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/predict")
async def predict(data: ModelInput):
    input_data = np.array([[data.feature1, data.feature2, data.feature3, data.feature4]])
    prediction = model.predict(input_data)
    probs = model.predict_proba(input_data)
    return {
        "prediction": int(prediction[0]),
        "probability_class0": int(probs[0][0]),
        "probability_class1": int(probs[0][1])
    }

@app.get("/")
def check():
    return{"message": "App is initiated"}