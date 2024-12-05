from flask import jsonify, Request
from prisma import Prisma

import asyncio
import os


def delete_handler(request: Request):
    file_id = request.json.get("file_id")
    if not file_id:
        return jsonify({"message": "File not found"})

    async def get_file(file_id):
        db = Prisma()
        await db.connect()

        file = await db.file.find_first(where={"id": file_id})
        await db.disconnect()
        return file

    async def delete_from_db():
        db = Prisma()
        await db.connect()

        file = await db.file.delete(where={"id": file_id})
        await db.disconnect()
        return file

    file = dict(asyncio.run(get_file(file_id)))
    if not file:
        return jsonify({"message": "File not found"})

    try:
        file_path = os.path.join(os.getcwd(), file["path"])
        os.remove(file_path)

        asyncio.run(delete_from_db())
        return jsonify({"message": "File deleted"})
    except Exception as e:
        return jsonify({"message": str(e)})