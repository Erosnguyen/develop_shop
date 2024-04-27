from fastapi import APIRouter

from .schema import HealthResponseSchema

router = APIRouter(prefix="/health")


@router.get("/")
async def status() -> HealthResponseSchema:
    return {"health": "ok"}