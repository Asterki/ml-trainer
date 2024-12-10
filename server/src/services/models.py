import uuid
import pickle
import os
import asyncio
from prisma import Prisma
from datetime import datetime


def save_model(model, type, dataset_id):
    model_id = str(uuid.uuid4())

    model_dir = os.path.join(os.getcwd(), "models")
    os.makedirs(model_dir, exist_ok=True)  # Ensure the directory exists

    model_path = os.path.join(model_dir, f"{model_id}.pkl")

    async def register_model_to_db():
        db = Prisma()
        await db.connect()

        await db.trainedmodel.create(
            {
                "id": model_id,
                "type": type,
                "modelPath": model_path,
                'createdAt': datetime.now(),
                "dataset_id": dataset_id,
            }
        )

        await db.disconnect()

    asyncio.run(register_model_to_db())

    # Save the model to disk
    with open(model_path, "wb") as file:
        pickle.dump(model, file)
    return model_id, model_path


def get_model(modelId):
    async def get_model_from_db():
        db = Prisma()
        await db.connect()

        res = await db.trainedmodel.find_first(where={"id": modelId})
        await db.disconnect()
        return res

    model_data = dict(asyncio.run(get_model_from_db()))
    if not model_data:
        return None

    model = None
    with open(model_data["modelPath"], "rb") as file:
        model = pickle.load(file)

    return model_data, model