from flask import jsonify, Request, send_from_directory
from prisma import Prisma
import pandas as pd
import matplotlib.pyplot as plt

import asyncio
import os
from pydantic import BaseModel, ValidationError
from typing import List


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

        # Implement training logic here
    except ValidationError as e:
        return jsonify({"message": "Validation error", "errors": e.errors()}), 400
