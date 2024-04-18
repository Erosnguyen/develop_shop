from typing import Any

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class BlogPostBase(BaseResponseSchema):
    title: str
    content: str


class BlogPostCreate(BaseResponseSchema):
    pass


class BlogPostUpdate(BaseResponseSchema):
    pass
