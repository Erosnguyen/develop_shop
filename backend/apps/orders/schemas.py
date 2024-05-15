from typing import List

from pydantic import BaseModel, validator

"""
---------------------------------------
--------------- Orders ---------------
---------------------------------------
"""


class OrderItemSchema(BaseModel):
    variant_product_id: int
    quantity: int


class OrderSchema(BaseModel):
    order_id: int
    customer_id: int
    total_price: float
    status: str
    items: List[OrderItemSchema]

    class Config:
        from_attributes = True


class OrderCreateSchema(BaseModel):
    items: List[OrderItemSchema]


class OrderUpdateSchema(BaseModel):
    status: str

    @validator("status")
    def validate_status(cls, value):
        valid_statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
        if value not in valid_statuses:
            raise ValueError("Invalid status value")
        return value


"""
---------------------------------------
--------------- Payment ---------------
---------------------------------------
"""
