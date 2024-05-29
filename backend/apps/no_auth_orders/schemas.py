from typing import List

from pydantic import BaseModel


class GuestOrderItemSchema(BaseModel):
    variant_product_id: int
    quantity: int


class GuestAddressSchema(BaseModel):
    street: str
    city: str
    state: str
    country: str


class GuestOrderCreateSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    items: List[GuestOrderItemSchema]
    address: GuestAddressSchema


class GuestOrderSchema(BaseModel):
    order_id: int
    total_price: float
    status: str
    first_name: str
    last_name: str
    email: str
    address: GuestAddressSchema
    items: List[GuestOrderItemSchema]

    class Config:
        from_attributes = True
