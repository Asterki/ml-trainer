from flask import jsonify, Request, send_from_directory
from prisma import Prisma

import asyncio


def list_handler(request: Request):
    async def get_files():
        db = Prisma()
        await db.connect()

        result = await db.file.find_many()

        await db.disconnect()
        return result

    result = asyncio.run(get_files())
    files = [file.dict() for file in result]

    return jsonify({"files": files})
