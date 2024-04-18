from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from .schema import CategoryBase, CategoryCreate

router = APIRouter(prefix="/category", tags=["Category"])


@router.get("/", response_class=HTMLResponse)
async def home():
    return {"message": "Welcome to the main page"}


@router.get("/{slug}", response_class=HTMLResponse)
async def view_category(slug: str):
    return {"message": f"Viewing category: {slug}"}


@router.post("/{slug}", response_class=HTMLResponse)
async def view_category_filter(slug: str):
    return {"message": f"Filtering category: {slug}"}
