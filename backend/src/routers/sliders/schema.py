from typing import Any, Optional

from pydantic import BaseModel

from src.common.base_schema import BaseResponseSchema


class SliderBase(BaseResponseSchema):
    title: str
    description: Optional[str] = None
    image_url: str


class SliderCreate(BaseResponseSchema):
    pass


class SliderUpdate(BaseResponseSchema):
    pass


class Slider(BaseResponseSchema):
    id: int

    class Config:
        orm_mode = True
