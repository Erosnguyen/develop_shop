from typing import Any

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class UserLogin(BaseResponseSchema):
    username: str
    password: str


class UserRegistration(BaseResponseSchema):
    username: str
    email: str
    password: str
