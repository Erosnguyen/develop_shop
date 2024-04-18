from fastapi import APIRouter

from src.routers.users.schema import UserCreate, UserUpdate

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
async def get_users():
    pass


@router.get("/{user_id}")
async def get_user(user_id: int):
    pass


@router.post("/")
async def create_user(user: UserCreate):
    pass


@router.put("/{user_id}")
async def update_user(user_id: int, user: UserUpdate):
    pass


@router.delete("/{user_id}")
async def delete_user(user_id: int):
    pass
