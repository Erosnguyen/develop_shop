import asyncio

from apps.accounts.faker.data import FakeUser
from apps.products.faker.data import FakeProduct

if __name__ == "__main__":
    from fastapi import FastAPI

    from config.database import DatabaseManager
    from config.routers import RouterManager

    DatabaseManager().create_database_tables()
    app = FastAPI()

    RouterManager(app).import_routers()

    FakeUser.populate_members()

    asyncio.run(FakeProduct.populate_30_products())
