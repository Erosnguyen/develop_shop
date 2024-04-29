from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from config.database import DatabaseManager
from config.routers import RouterManager
from config.settings import MEDIA_DIR

DatabaseManager().create_database_tables()


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/media", StaticFiles(directory=MEDIA_DIR), name="media")

RouterManager(app).import_routers()
