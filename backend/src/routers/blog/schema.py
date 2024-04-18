from typing import List, Optional

from src.common.base_schema import BaseResponseSchema


class BlogBase(BaseResponseSchema):
    name: str
    slug: str
    description: str
    content: str
    image: str
    is_draft: bool
    meta_title: Optional[str]
    meta_description: Optional[str]
    meta_keyword: Optional[str]


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BlogBase):
    pass


class Blog(BlogBase):
    id: int

    class Config:
        orm_mode = True
