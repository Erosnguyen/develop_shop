from typing import Any, List, Optional

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema
from src.routers.category.schema import CategoryBase


class CategoryBase(BaseResponseSchema):
    name: str
    slug: str
    description: str
    image: str
    parent_id: Optional[int] = None
    meta_title: Optional[str]
    meta_description: Optional[str]


class Category(CategoryBase):
    id: int
    children: List["Category"] = []
    parent: Optional["Category"] = None

    class Config:
        orm_mode = True
