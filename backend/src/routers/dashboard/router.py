from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/")
async def dashboard():
    return {"message": "Admin dashboard retrieved successfully"}
