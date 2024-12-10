from flask import Blueprint, request
import sys


sys.path.append("..")
from controllers.test_model.regression import test_regression_model

test_model_router = Blueprint(
    "test_model_router", __name__, url_prefix="/api/test_model"
)


@test_model_router.route("/regression", methods=["POST"])
def test_regression():
    return test_regression_model(request)
