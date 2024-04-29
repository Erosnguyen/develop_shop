from fastapi import APIRouter, HTTPException, status  # type: ignore

from .schemas import OrderSchema
from .services import OrderService

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=OrderSchema,
    summary="Create a new order",
    description="Create a new order.",
)
async def create_order(order: OrderSchema):
    created_order = OrderService.create_order(order)
    return created_order


@router.get(
    "/{order_id}",
    status_code=status.HTTP_200_OK,
    response_model=OrderSchema,
    summary="Retrieve a single order",
    description="Retrieve a single order by its ID.",
)
async def retrieve_order(order_id: int):
    order = OrderService.retrieve_order(order_id)
    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
    return order


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=list[OrderSchema],
    summary="Retrieve a list of orders",
    description="Retrieve a list of orders.",
)
async def list_orders():
    orders = OrderService.list_orders()
    return orders
