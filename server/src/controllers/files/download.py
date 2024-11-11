from flask import jsonify, Request, send_from_directory
from prisma import Prisma

import asyncio
import os


def download_handler(request: Request):
    file_id = request.args.get("file_id")
    if not file_id:
        return jsonify({"message": "File not found"})

    async def register_file_to_db():
        db = Prisma()
        await db.connect()

        res = await db.file.find_first(where={"id": file_id})
        await db.disconnect()
        return res

    file = dict(asyncio.run(register_file_to_db()))
    if not file:
        return jsonify({"message": "File not found"})

    file_path = file["path"]
    return send_from_directory(os.getcwd(), file_path, as_attachment=True)
