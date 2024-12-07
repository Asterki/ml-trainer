from flask import jsonify, Request
from prisma import Prisma
import pandas as pd
import sys
import uuid
import pickle
import matplotlib.pyplot as plt

import asyncio
from pydantic import BaseModel, ValidationError
from typing import List


sys.path.append("..")
from services.regression import train_linear_regression_model
from services.models import save_model


class TrainingParams(BaseModel):
    features: List[str]
    target: str
    model: str


class Params(BaseModel):
    trainingParams: TrainingParams


class TrainingRequest(BaseModel):
    datasetId: str
    params: Params


def training_regression_handler(request: Request):
    try:
        data = request.json
        training_request = TrainingRequest(**data)

        async def get_file_from_db():
            db = Prisma()
            await db.connect()

            res = await db.file.find_first(where={"id": training_request.datasetId})
            await db.disconnect()
            return res

        file = dict(asyncio.run(get_file_from_db()))
        if not file:
            return jsonify({"message": "File not found"}), 404

        file_path = file["path"]
        data = pd.read_csv(file_path)

        model = train_linear_regression_model(
            data,
            training_request.params.trainingParams.target,
            training_request.params.trainingParams.features,
        )

        # Just for testing, lets predict a value and plot it
        X = data[training_request.params.trainingParams.features]
        y = data[training_request.params.trainingParams.target]

        # Get the model accuracy
        accuracy = model.score(X, y)

        # Save the model
        model_id, model_path = save_model(
            model, training_request.params.trainingParams.model, file["id"]
        )

        return jsonify(
            {
                "message": "Model trained successfully",
                "modelId": str(model_id),
                "accuracy": accuracy,
            }
        )

    except ValidationError as e:
        return jsonify({"message": "Validation error", "errors": e.errors()}), 400
