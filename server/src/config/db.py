from prisma import Prisma
import asyncio

class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance._db = Prisma()
            cls._instance._loop = asyncio.get_event_loop()
            cls._instance._loop.run_until_complete(cls._instance._db.connect())
        return cls._instance

    def get_db(self):
        return self._db

    async def disconnect(self):
        await self._db.disconnect()
        self._loop.close()