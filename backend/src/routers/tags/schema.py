from typing import Any

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class TagBase(BaseResponseSchema):
    name: str


class TagCreate(BaseResponseSchema):
    pass


class TagUpdate(BaseResponseSchema):
    pass
