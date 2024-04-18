from typing import Any

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class CategoryBase(BaseResponseSchema):
    name: str


class CategoryCreate(BaseResponseSchema):
    pass
