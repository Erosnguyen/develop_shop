from fastapi import status
from fastapi_camelcase import CamelModel


class BaseResponseSchema(CamelModel):
    message: str = "success"
    status_code: int = status.HTTP_200_OK
