from fastapi import APIRouter, Response, status

from .schema import HealthcheckResponseSchema

router = APIRouter(prefix="")


@router.get("/")
async def health(res: Response) -> HealthcheckResponseSchema:
    res.status_code = status.HTTP_200_OK
    return {"message": "ok", "status_code": status.HTTP_200_OK}
