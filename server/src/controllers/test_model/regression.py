from flask import jsonify, Request
from prisma import Prisma
import sys

import asyncio
from pydantic import BaseModel, ValidationError


sys.path.append("..")
from services.models import get_model


class RegressiionResultsRequest(BaseModel):
    modelId: str
    values: list


def test_regression_model(request: Request):
    try:
        data = request.json
        training_request = RegressiionResultsRequest(**data)

        model_data, model = get_model(training_request.modelId)

        if not model_data or not model:
            return jsonify({"message": "Model not found"}), 404

        predictions = model.predict([training_request.values])

        return jsonify({"predictions": predictions.tolist()}), 200

    except ValidationError as e:
        return jsonify({"message": "Validation error", "errors": e.errors()}), 400
