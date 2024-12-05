from flask import jsonify, Request, send_from_directory
from prisma import Prisma
import pandas as pd
import matplotlib.pyplot as plt

import asyncio
import os


def plot_dataset_handler(request: Request):
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

    data = pd.read_csv(file["path"])
    
    # Check if it's a 2 column dataset
    plt.scatter(data.iloc[:, 0], data.iloc[:, 1])
    plt.savefig("plot.png")
    plt.close()
    
    return send_from_directory(os.getcwd(), "plot.png")

    
