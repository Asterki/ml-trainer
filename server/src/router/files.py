from flask import Blueprint, request
import sys


sys.path.append("..")
from controllers.files.upload import upload_handler
from controllers.files.download import download_handler
from controllers.files.list import list_handler
from controllers.files.delete import delete_handler

files_router = Blueprint("files_router", __name__, url_prefix="/api/files")


@files_router.route("/upload", methods=["POST"])  # type: ignore
def upload():
    return upload_handler(request)

@files_router.route("/download", methods=["GET"])  # type: ignore
def download():
    return download_handler(request)

@files_router.route("/list", methods=["GET"]) 
def list():
    return list_handler(request)

@files_router.route("/delete", methods=["POST"])
def delete():
    return delete_handler(request)