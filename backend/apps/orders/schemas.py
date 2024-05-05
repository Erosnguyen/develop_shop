from typing import List

from pydantic import BaseModel

"""
---------------------------------------
--------------- Orders ---------------
---------------------------------------
"""


class OrderItemSchema(BaseModel):
    product_id: int
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
    # customer_id: int
    # total_price: float
    # status: str
    items: List[OrderItemSchema]


"""
---------------------------------------
--------------- Payment ---------------
---------------------------------------
"""
