from fastapi import APIRouter, Depends, HTTPException, status

from apps.accounts.services.authenticate import AccountService
from apps.accounts.services.permissions import Permission
from apps.accounts.services.user import User

from .schemas import (OrderCreateSchema, OrderItemSchema, OrderSchema,
                      OrderUpdateSchema)
from .services import OrderService, AddressSchema

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    # response_model=OrderSchema,
    summary="Create a new order",
    description="Create a new order. Order should be a list include variant_product_id and quantity.",
)
async def create_order(
    order: OrderCreateSchema, address: AddressSchema, current_user: User = Depends(AccountService.current_user)
):
    user_id = current_user.id
    created_order = await OrderService.create_order(user_id, order.items, address)
    return created_order


@router.get(
    "/{order_id}",
    status_code=status.HTTP_200_OK,
    # response_model=OrderSchema,
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
    # response_model=list[OrderSchema],
    summary="Retrieve a list of orders",
    description="Retrieve a list of orders.",
    dependencies=[Depends(Permission.is_admin)],
)
async def list_orders():
    orders = OrderService.list_orders()
    return orders


@router.post(
    "/customer_id",
    status_code=status.HTTP_200_OK,
    # response_model=List[OrderSchema],
    summary="Retrieve a list of orders by customer ID",
    description="Retrieve a list of orders placed by the authenticated customer.",
)
async def list_orders_by_customer_id(
    current_user: User = Depends(AccountService.current_user),
):
    customer_id = int(current_user.id)
    orders = OrderService.list_orders_by_customer_id(customer_id)
    return orders


@router.put(
    "/{order_id}",
    status_code=status.HTTP_200_OK,
    summary="Update an existing order",
    description="""Update an existing order by its ID. 
    Valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']""",
    response_model=OrderSchema,
)
async def update_order(
    order_id: int,
    update_data: OrderUpdateSchema,
    current_user: User = Depends(AccountService.current_user),
):
    updated_order = await OrderService.update_order(order_id, update_data)
    if updated_order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
    return updated_order


@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an order",
    description="Delete an order by its ID.",
)
async def delete_order(
    order_id: int, current_user: User = Depends(AccountService.current_user)
):
    deleted_order = await OrderService.delete_order(order_id)
    if deleted_order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )
    return {"message": "Order deleted successfully"}
