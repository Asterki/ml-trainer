from flask import Blueprint, request
import sys


sys.path.append("..")
from controllers.training.regression import training_regression_handler

training_router = Blueprint("training_router", __name__, url_prefix="/api/training")


@training_router.route("/regression", methods=["POST"]) 
def train_regression():
    return training_regression_handler(request)
