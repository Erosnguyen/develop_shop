from typing import Any

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class ProductBase(BaseResponseSchema):
    name: str
    description: str
    price: float


class ProductCreate(BaseResponseSchema):
    pass


class ProductUpdate(BaseResponseSchema):
    pass
