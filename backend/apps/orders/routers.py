from fastapi import APIRouter, Depends, HTTPException, status

from apps.core.services.permissions import Permission
from apps.orders.schemas import OrderSchema
from apps.orders.services import OrderService

orders_router = APIRouter(prefix="/orders")


@orders_router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=OrderSchema,
    summary="Create a new order",
    description="Create a new order.",
    tags=["Order"],
    dependencies=[Depends(Permission.is_authenticated)],
)
async def create_order(order: OrderSchema):
    created_order = OrderService.create_order(order)
    return created_order


@orders_router.get(
    "/{order_id}",
    status_code=status.HTTP_200_OK,
    response_model=OrderSchema,
    summary="Retrieve a single order",
    description="Retrieve a single order by its ID.",
    tags=["Order"],
    dependencies=[Depends(Permission.is_authenticated)],
)
async def retrieve_order(order_id: int):
    order = OrderService.retrieve_order(order_id)
    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
    return order


@orders_router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=list[OrderSchema],
    summary="Retrieve a list of orders",
    description="Retrieve a list of orders.",
    tags=["Order"],
    dependencies=[Depends(Permission.is_authenticated)],
)
async def list_orders():
    orders = OrderService.list_orders()
    return orders
