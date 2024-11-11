from flask import jsonify, Request
from uuid import uuid4
from prisma import Prisma
import asyncio

def upload_handler(request: Request):
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_id = str(uuid4())
    file.extension = file.filename.split(".")[-1]
    if file.extension not in ["csv"]:
        return jsonify({"error": "Invalid file extension"}), 400

    file.save(f"uploads/{file_id}.{file.extension}")

    async def register_file_to_db():
        db = Prisma()
        await db.connect()

        await db.file.create(
            {
                "id": file_id,
                "extension": file.extension,
                "filename": file.filename,
                "path": f"uploads/{file_id}.{file.extension}",
            }
        )
        
        await db.disconnect()

    asyncio.run(register_file_to_db())
    return jsonify({"message": "File uploaded successfully", "file_id": file_id})
