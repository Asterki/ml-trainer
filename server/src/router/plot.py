from flask import Blueprint, request
import sys


sys.path.append("..")
from controllers.plot.plot_dataset import plot_dataset_handler

plot_router = Blueprint("plot_router", __name__, url_prefix="/api/plot")


@plot_router.route("/plot_dataset", methods=["GET"])  # type: ignore
def upload():
    return plot_dataset_handler(request)
