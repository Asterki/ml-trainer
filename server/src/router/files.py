from flask import Blueprint, request
import sys


sys.path.append("..")
from controllers.files.upload import upload_handler

files_router = Blueprint("upload_router", __name__, url_prefix="/api/files")


@files_router.route("/upload", methods=["POST"])  # type: ignore
def upload():
    return upload_handler(request)


