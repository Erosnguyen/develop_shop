from fastapi import APIRouter, HTTPException, status

from .schemas import GuestOrderCreateSchema, GuestOrderSchema
from .services import GuestOrderService

router = APIRouter(prefix="/guest_order", tags=["Guest Orders"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Create a new order for guest users",
    description="Create a new order for users who do not have an account.",
    response_model=GuestOrderSchema,
)
async def create_guest_order(guest_order_data: GuestOrderCreateSchema):
    try:
        order = await GuestOrderService.create_guest_order(order_data=guest_order_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
        )
    return order
