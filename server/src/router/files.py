from flask import Blueprint, request
from pydantic import BaseModel, ValidationError
import sys


sys.path.append("..")
from controllers.files.upload import handler as upload_handler

files_router = Blueprint("upload_router", __name__, url_prefix="/api/files")


class UploadRequest(BaseModel):
    file: str


@files_router.route("/upload", methods=["POST"])  # type: ignore
def upload():
    try:
        request_data = UploadRequest(**request.json)
    except ValidationError as e:
        return {"error": e.errors()}

    res = upload_handler(request_data.file)

    return {"message": "File uploaded successfully"}
