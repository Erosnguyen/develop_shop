from fastapi import APIRouter, Depends, HTTPException, status

from apps.accounts.services.authenticate import AccountService
from apps.accounts.services.user import User

from .schemas import OrderCreateSchema, OrderSchema,OrderUpdateSchema
from .services import OrderService

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=OrderSchema,
    summary="Create a new order",
    description="Create a new order. Order should be a list include product_id and quantity.",
)
async def create_order(
    order: OrderCreateSchema, current_user: User = Depends(AccountService.current_user)
):
    user_id = current_user.id
    created_order = OrderService.create_order(user_id, order)
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
@router.put(
    "/{order_id}",
    status_code=status.HTTP_200_OK,
    response_model=OrderSchema,
    summary="Update an existing order",
    description="Update an existing order by its ID.",
)
async def update_order(order_id: int, order: OrderUpdateSchema):
    updated_order = OrderService.update_order(order_id, order)
    if updated_order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
    return updated_order

@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an existing order",
    description="Delete an existing order by its ID.",
)
async def delete_order(order_id: int):
    deleted_order = OrderService.delete_order(order_id)
    if not deleted_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
    return