from typing import Any

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class UserBase(BaseResponseSchema):
    username: str
    email: str


class UserCreate(BaseResponseSchema):
    password: str


class UserUpdate(BaseResponseSchema):
    pass
