from typing import Any

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class OrderBase(BaseResponseSchema):
    user_id: int
    product_id: int
    quantity: int


class OrderCreate(BaseResponseSchema):
    pass


class OrderUpdate(BaseResponseSchema):
    pass
