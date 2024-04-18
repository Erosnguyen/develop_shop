from fastapi import APIRouter

from src.routers.orders.schema import OrderCreate, OrderUpdate

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.get("/")
async def get_orders():
    pass


@router.get("/{order_id}")
async def get_order(order_id: int):
    pass


@router.post("/")
async def create_order(order: OrderCreate):
    pass


@router.put("/{order_id}")
async def update_order(order_id: int, order: OrderUpdate):
    pass


@router.delete("/{order_id}")
async def delete_order(order_id: int):
    pass
