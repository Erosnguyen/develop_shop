from typing import List, Optional

from pydantic import BaseModel


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


class GuestOrderItemSchema(BaseModel):
    variant_product_id: int
    quantity: int
    product: Optional[ProductSchema]


class GuestAddressSchema(BaseModel):
    street: str
    city: str
    state: str
    country: str
    phone: Optional[str] = None


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
