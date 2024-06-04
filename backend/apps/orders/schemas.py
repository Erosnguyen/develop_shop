from typing import List, Optional

from pydantic import BaseModel, validator

"""
---------------------------------------
--------------- Orders ---------------
---------------------------------------
"""


class ProductMediaSchema(BaseModel):
    media_id: int
    product_id: int
    alt: str
    src: str
    type: str
    updated_at: Optional[str] = None
    created_at: str


class ProductOptionItemSchema(BaseModel):
    item_id: int
    item_name: str


class ProductOptionSchema(BaseModel):
    options_id: int
    option_name: str
    items: List[ProductOptionItemSchema]


class ProductVariantSchema(BaseModel):
    variant_id: int
    product_id: int
    price: float
    stock: int
    option1: Optional[int] = None
    option2: Optional[int] = None
    option3: Optional[int] = None
    created_at: str
    updated_at: Optional[str] = None


class ProductSchema(BaseModel):
    product_id: int
    product_name: str
    description: Optional[str] = None
    status: Optional[str] = None
    created_at: str
    updated_at: Optional[str] = None
    published_at: Optional[str] = None
    options: Optional[List[ProductOptionSchema]] = None
    variants: Optional[List[ProductVariantSchema]] = None
    media: Optional[List[ProductMediaSchema]] = None


class AddressSchema(BaseModel):
    street: str
    city: str
    state: str
    country: str


class OrderItemSchema(BaseModel):
    variant_product_id: int
    quantity: int
    product: Optional[ProductSchema]


class OrderSchema(BaseModel):
    order_id: int
    customer_id: int
    total_price: float
    status: str
    address: AddressSchema
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
