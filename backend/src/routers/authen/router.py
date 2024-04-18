from fastapi import APIRouter

from src.routers.authen.schema import UserLogin, UserRegistration

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
async def login(user: UserLogin):
    return {"message": "Login successful"}


@router.post("/register")
async def register(user: UserRegistration):
    return {"message": "User registered successfully"}
